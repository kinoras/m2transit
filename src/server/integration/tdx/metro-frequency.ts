import { MetroLine } from '@/types/route'

import type { FrequencyResponse, ServiceDay } from '#/types/tdx-metro'

import withCache from '#/lib/cache'
import { interpolate, makeURI, toExtendedDaySeconds } from '#/lib/utils'

import { getAuthHeader } from './auth'

type PeriodFrequency = {
    /** Start of the period in extended day seconds. */
    from: number
    /** End of the period in extended day seconds. */
    to: number
    /** The average train frequency within the period. */
    frequency: number
}

/**
 * Gets the frequency table of a metro line.
 *
 * @param line - TDX LineID field.
 * @param station - TDX StationID field.
 * @param destinations - Array of TDX DestinationStationID fields.
 * @param day - Service day type.
 * @returns ???
 */
export const getFrequency = async (
    line: MetroLine,
    day: ServiceDay
): Promise<PeriodFrequency[]> => {
    // Cache key
    const key = `metro-frequency:${line}:${day}`

    const [cache, setCache] = await withCache<PeriodFrequency[]>(key)

    // Hit: Return the cached data
    if (cache) return cache

    // Miss: Fetch and process fresh data, cache it, and return
    const _data = await fetchFrequency(line, day)
    const data = processFrequency(_data)
    await setCache(data, 86400) // Cache for 1 day

    return data
}

/**
 * Fetches metro line frequency from TDX.
 *
 * @param line - TDX LineID field.
 * @param day - Service day type.
 * @returns Raw frequency responses from TDX.
 * @throws Error if the API request fails.
 */
const fetchFrequency = async (
    line: MetroLine,
    day: ServiceDay
): Promise<FrequencyResponse[]> => {
    // Query URI
    const queryURI = makeURI(
        `https://tdx.transportdata.tw/api/basic/v2/Rail/Metro/Frequency/TRTC`,
        {
            $select: 'Headways',
            $filter: `LineID eq '${line}' and ServiceDay/${day} eq true`,
            $top: '100',
            $format: 'JSON'
        }
    )

    // Make API request
    const response = await fetch(queryURI, { headers: await getAuthHeader() })

    if (!response.ok)
        throw new Error(
            `Failed to fetch metro frequency from TDX:\n${response.status} - ${await response.text()}`
        )

    // Return the response from TDX
    return (await response.json()) ?? []
}

const processFrequency = (frequency: FrequencyResponse[]): PeriodFrequency[] =>
    frequency
        .map(({ Headways }) =>
            Headways.map(
                ({ StartTime, EndTime, MinHeadwayMins, MaxHeadwayMins }) => ({
                    from: toExtendedDaySeconds(`${StartTime}:00`)[0],
                    to: toExtendedDaySeconds(`${EndTime}:00`)[0],
                    frequency: Math.round(
                        interpolate(MinHeadwayMins, MaxHeadwayMins, 0.25) * 60
                    )
                })
            )
        )
        .flat()
        .sort((a, b) => a.from - b.from)
