import type { BusArrivalResponse } from '#/types/tdx-bus'

import { withCache } from '#/lib/cache'
import { makeURI } from '#/lib/utils'

import { getAuthHeader } from './auth'

/**
 * Gets bus arrival with cache.
 *
 * - Try to read cached data first.
 * - If cache is missed, fetches from TDX and cache it.
 *
 * @param routeName - TDX RouteName field.
 * @param stopUID - TDX StopUID field.
 * @returns An array of BusArrival objects.
 */
export const getBusArrivals = async (
    routeName: string,
    stopUID: string
): Promise<BusArrivalResponse[]> => {
    // Cache key
    const key = `bus:${routeName}:${stopUID}`

    const [cache, setCache] = await withCache<BusArrivalResponse[]>(key)

    // Hit: Return the cached data
    if (cache) return cache

    // Miss: Fetch fresh data, cache it, and return
    const data = await fetchBusArrivals(routeName, stopUID)
    await setCache(data, 10) // Cache for 10 seconds

    return data
}

/**
 * Fetches bus arrival information from TDX.
 *
 * @param routeName - TDX RouteName field.
 * @param stopUID - TDX StopUID field.
 * @returns An array of BusArrival objects.
 * @throws Error if the API request fails.
 */
const fetchBusArrivals = async (
    routeName: string,
    stopUID: string
): Promise<BusArrivalResponse[]> => {
    // Query URI
    const queryURI = makeURI(
        `https://tdx.transportdata.tw/api/basic/v2/Bus/EstimatedTimeOfArrival/City/Taipei/${routeName}`,
        {
            $select: `EstimateTime, StopStatus`,
            $filter: `StopUID eq '${stopUID}'`,
            $orderby: 'EstimateTime asc',
            $top: '1',
            $format: 'JSON'
        }
    )

    // Make API request
    const response = await fetch(queryURI, { headers: await getAuthHeader() })

    if (!response.ok)
        throw new Error(
            `Failed to fetch bus arrival status from TDX:\n${response.status} - ${await response.text()}`
        )

    // Return the response from TDX
    return (await response.json()) ?? []
}
