import { MetroLine } from '@/types/route'

import type { ServiceDay, StationScheduleResponse } from '#/types/tdx-metro'

import { withCache } from '#/lib/cache'
import { makeURI, toExtendedDaySeconds } from '#/lib/utils'

import { getAuthHeader } from './auth'
import { getFrequency } from './metro-frequency'
import { getServiceHours } from './metro-service-hours'

type StationSchedules = number[] // Array of extended day seconds

/**
 * Gets station-specific metro schedules with cache.
 *
 * - Try to read cached data first.
 * - If cache is missed, fetches from TDX and cache it.
 *
 * @param line - TDX LineID field.
 * @param station - TDX StationID field.
 * @param destinations - Array of TDX DestinationStationID fields.
 * @param day - Service day type.
 * @returns Station schedule as an array of extended day seconds.
 */
export const getStationSchedules = async (
    line: MetroLine,
    station: string,
    destinations: string[],
    day: ServiceDay
): Promise<StationSchedules> => {
    // Cache key
    const key = `metro-schedule:${station}:${destinations.join('-')}:${day}`

    const [cache, setCache] = await withCache<StationSchedules>(key)

    // Hit: Return the cached data
    if (cache) return cache

    // Miss: Fetch and process fresh data, cache it, and return
    const data =
        line === 'BR'
            ? await buildStationSchedules(line, station, destinations, day)
            : await fetchStationSchedules(
                  line,
                  station,
                  destinations,
                  day
              ).then(processStationSchedules)

    await setCache(data, 86400) // Cache for 1 day

    return data
}

/**
 * Fetches metro schedules for a specific station from TDX.
 *
 * @param line - TDX LineID field.
 * @param station - TDX StationID field.
 * @param destinations - Array of TDX DestinationStationID fields.
 * @param day - Service day type.
 * @returns Raw station schedule responses from TDX.
 * @throws Error if the API request fails.
 */
const fetchStationSchedules = async (
    line: MetroLine,
    station: string,
    destinations: string[],
    day: ServiceDay
): Promise<StationScheduleResponse[]> => {
    // Query URI
    const queryURI = makeURI(
        `https://tdx.transportdata.tw/api/basic/v2/Rail/Metro/StationTimeTable/TRTC`,
        {
            $select: `Timetables`,
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
            `Failed to fetch metro station schedules from TDX:\n${response.status} - ${await response.text()}`
        )

    // Return the response from TDX
    return (await response.json()) ?? []
}

/**
 * Processes raw station schedule responses into a clean array of arrival times.
 *
 * @param schedules - The array of station schedule responses.
 * @returns Sorted array of arrival times.
 */
const processStationSchedules = (
    schedules: StationScheduleResponse[]
): StationSchedules => {
    const arrivals = schedules
        // Extract arrival time and convert it into extended day seconds
        .map(({ Timetables }) =>
            Timetables.map(
                ({ ArrivalTime }) =>
                    toExtendedDaySeconds(`${ArrivalTime}:00`)[0]
            )
        )
        // Merge the arrival times
        .flat()

    // Remove duplicates and return sorted
    return [...new Set(arrivals)].sort()
}

/**
 * Construct station schedules for reference based on frequency and service hours.
 *
 * @param line - TDX LineID field.
 * @param station - TDX StationID field.
 * @param destinations - Array of TDX DestinationStationID fields.
 * @param day - Service day type.
 * @returns Generated schedule as an array of extended day seconds.
 */
const buildStationSchedules = async (
    line: MetroLine,
    station: string,
    destinations: string[],
    day: ServiceDay
): Promise<StationSchedules> => {
    // Fetch frequency and service hours
    const [frequency, { first, last }] = await Promise.all([
        getFrequency(line, day),
        getServiceHours(line, station, destinations, day)
    ])

    const schedules = [] as StationSchedules

    // Start from the first train
    let time = first

    // Generate schedule by incrementing time
    while (time <= last) {
        schedules.push(time)

        // Find the train frequency for current time
        const interval = frequency.find(({ from }) => time >= from)?.frequency
        // Handle exception and prevent infinite loops
        if (!interval || interval === 0) break

        time += interval
    }

    return schedules
}
