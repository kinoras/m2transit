import type { Direction } from '@/types/direction'

export type CachedResult<T> = {
    /** The actual data fetched */
    data: T
    /** Cache time-to-live in seconds */
    ttl?: number
}

/**
 * Extracts max-age from the Cache-Control header.
 *
 * @param headers HTTP response headers object.
 * @returns The max-age value in seconds, or undefined if not found.
 */
const extractMaxAge = (headers: Headers): number | undefined => {
    // Get the Cache-Control header
    const cacheControl = headers.get('Cache-Control')

    if (cacheControl) {
        // Extract the max-age directive
        const match = cacheControl.match(/max-age=(\d+)/)
        if (match) return parseInt(match[1], 10)
    }
    return undefined
}

/**
 * Fetches directions from API.
 * 
 * @returns A promise that resolves to a CachedResult object containing directions data and cache TTL.
 */
export const fetchDirections = async (): Promise<CachedResult<Direction[]>> => {
    const response = await fetch('/api/directions')
    const data = await response.json()
    const ttl = extractMaxAge(response.headers)
    return { data, ttl }
}
