import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

import type { GroupedRoutes, Method, Route } from '@/types/route'

dayjs.extend(duration)

/**
 * Groups routes by their transport method.
 *
 * @param routes - The array of routes of different methods to be grouped.
 * @returns An object with routes organized by method.
 */
export const groupRoutesByMethod = (routes: Route<Method>[]): GroupedRoutes => {
    return routes.reduce(
        (acc, route) => {
            // Add the route to its corresponding method array
            ;(acc[route.method] as Route<typeof route.method>[]).push(route)
            return acc
        },
        { Shuttle: [], Bus: [], Metro: [] } as GroupedRoutes // Initial accumulator object
    )
}

/**
 * Converts seconds to minutes (rounded).
 *
 * @param seconds - The number of seconds to convert.
 * @returns The integer number of minutes.
 */
export const secondsToMinutes = (seconds: number): number => {
    return Math.round(dayjs.duration({ seconds }).as('minutes'))
}
