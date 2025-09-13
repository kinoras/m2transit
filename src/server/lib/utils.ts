import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import type { Time } from '#/types/base'

dayjs.extend(customParseFormat)

/**
 * Computes the time difference in seconds between two time strings in 'HH:mm:ss' format.
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

/**
 * Converts time string in 'HH:mm:ss' format to extended day seconds.
 *
 * Useful for handling times that cross midnight.
 *
 * @param timeString - Time string in HH:mm:ss format
 * @param extend - Hour extension value. Default to `3` (i.e., time from 03:00 - 26:59).
 * @returns Total seconds from start of the extended day.
 */
export const toExtendedDaySeconds = (
    timeString: string,
    extension: number = 3
): [seconds: number, extended: boolean] => {
    // Parse time strings to dayjs objects
    const format = 'HH:mm:ss'
    const time = dayjs(timeString, format)

    // Calculate seconds since the start of the day
    const daySeconds = time.diff(time.startOf('day'), 'seconds')

    return daySeconds < 3600 * extension // Check if the time should be extended
        ? [daySeconds + 86400, true] // Extend by adding 24 hours (86400 seconds)
        : [daySeconds, false]
}

/**
 * Converts dayjs object to extended date and seconds.
 *
 * Useful for processing overnight time with proper date handling.
 *
 * @param day - dayjs object representing the datetime.
 * @param extension - Hour extension value. Default to `3`.
 * @returns A tuple containing the date string and the total seconds from start of the extended day.
 */
export const toExtendedDateAndSeconds = (
    day: dayjs.Dayjs,
    extension: number = 3
): [date: string, seconds: number] => {
    // Compute the extended day seconds
    const timeString = day.format('HH:mm:ss')
    const [seconds, extended] = toExtendedDaySeconds(timeString, extension)

    return extended // See if the time is extended (early morning hours)
        ? [day.subtract(1, 'day').format('YYYY-MM-DD'), seconds] // Use the date of the previous day
        : [day.format('YYYY-MM-DD'), seconds]
}
