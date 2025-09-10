import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import { Time } from '@/server/type'

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
