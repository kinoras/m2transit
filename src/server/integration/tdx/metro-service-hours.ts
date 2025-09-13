import type { ServiceDay, ServiceHoursResponse } from '#/types/tdx-metro'

import withCache from '#/lib/cache'
import { makeURI, toExtendedDaySeconds } from '#/lib/utils'

import { getAuthHeader } from './auth'
import { MetroLine } from '@/types/route'

type ServiceHours = {
    /** Time of the first train in extended day seconds. */
    first: number
    /** Time of the last train in extended day seconds. */
    last: number
}

/**
 * Gets the service hours of a metro line for a specific station.
 *
 * @param line - TDX LineID field.
 * @param station - TDX StationID field.
 * @param destinations - Array of TDX DestinationStationID fields.
 * @param day - Service day type.
 * @returns A ServiceHours object.
 */
export const getServiceHours = async (
    line: MetroLine,
    station: string,
    destinations: string[],
    day: ServiceDay
): Promise<ServiceHours> => {
    // Cache key
    const key = `metro-service-hours:${station}:${destinations.join('-')}:${day}`

    const [cache, setCache] = await withCache<ServiceHours>(key)

    // Hit: Return the cached data
    if (cache) return cache

    // Miss: Fetch and process fresh data, cache it, and return
    const _data = await fetchServiceHours(line, station, destinations, day)
    const data = processServiceHours(_data)
    await setCache(data, 86400) // Cache for 1 day

    return data
}

/**
 * Fetches the service hours for a specific station from TDX.
 *
 * @param line - TDX LineID field.
 * @param station - TDX StationID field.
 * @param destinations - Array of TDX DestinationStationID fields.
 * @param day - Service day type.
 * @returns Raw service hours responses from TDX.
 * @throws Error if the API request fails.
 */
const fetchServiceHours = async (
    line: MetroLine,
    station: string,
    destinations: string[],
    day: ServiceDay
): Promise<ServiceHoursResponse[]> => {
    // Query URI
    const queryURI = makeURI(
        `https://tdx.transportdata.tw/api/basic/v2/Rail/Metro/FirstLastTimetable/TRTC`,
        {
            $select: 'FirstTrainTime, LastTrainTime',
            $filter: [
                `LineID eq '${line}'`,
                `StationID eq '${station}'`,
                `(${destinations.map((dest) => `DestinationStaionID eq '${dest}'`).join(' or ')})`,
                `ServiceDay/${day} eq true`
            ].join(' and '),
            $top: '100',
            $format: 'JSON'
        }
    )

    // Make API request
    const response = await fetch(queryURI, { headers: await getAuthHeader() })

    if (!response.ok)
        throw new Error(
            `Failed to fetch metro service hours from TDX:\n${response.status} - ${await response.text()}`
        )

    // Return the response from TDX
    return (await response.json()) ?? []
}

/**
 * Processes service hours responses to find earliest and latest train.
 *
 * @param serviceHours - Array of service hours responses from TDX.
 * @returns A ServiceHours object.
 */
const processServiceHours = (
    serviceHours: ServiceHoursResponse[]
): ServiceHours => ({
    first: Math.min(
        // Earliest first train across all routes
        ...serviceHours.map(({ FirstTrainTime }) => {
            return toExtendedDaySeconds(`${FirstTrainTime}:00`)[0]
        })
    ),
    last: Math.max(
        // Latest last train across all routes
        ...serviceHours.map(({ LastTrainTime }) => {
            return toExtendedDaySeconds(`${LastTrainTime}:00`)[0]
        })
    )
})
