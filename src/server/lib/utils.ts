import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import type { Time } from '#/types/base'

dayjs.extend(customParseFormat)

/**
 * Compute the time difference in seconds between two time strings in 'HH:mm:ss' format.
 *
 * @param x The first time string.
 * @param y The second time string.
 * @param abs Whether to return the absolute value.
 * @returns Time difference in seconds.
 */
export const secondsDiff = (x: Time, y: Time, abs?: boolean): number => {
    // Parse time strings to dayjs objects
    const format = 'HH:mm:ss'
    const timeX = dayjs(x, format)
    const timeY = dayjs(y, format)

    // Calculate difference in seconds
    const diff = timeY.diff(timeX, 'seconds')

    // Return absolute or raw difference
    return abs ? Math.abs(diff) : diff
}

/**
 * Constructs a URI by appending query parameters to a base URI.
 *
 * @param baseURI - The base URI to which query parameters will be appended.
 * @param query - An object representing key-value pairs for query parameters.
 * @returns The resulting URI with properly encoded query parameters.
 *
 * **Note**: Spaces in query parameters are encoded as '%20' instead of '+'.
 */
export const makeURI = (
    baseURI: string,
    query: Record<string, string>
): string => {
    // Convert the query object to a URL-encoded string
    const queryString = new URLSearchParams(query)
        .toString()
        .replace(/\+/g, '%20') // Replace '+' with '%20' for spaces

    // Append the query string to the base URI
    return `${baseURI}?${queryString}`
}
