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
 * Splits a bus route name into its base (prefix characters + number) and suffix (trailing characters).
 *
 * If no suffix is found, the entrie name is returned as the base.
 *
 * @param routeName - The route name to split.
 * @returns A tuple containing the base and the suffix.
 */
export const splitBusRouteName = (
    routeName: string
): [base: string, suffix: string] => {
    // Simplify bus route name
    const _routeName = routeName.replace(/(幹線|專車)/g, '').trim()

    // Find the suffix (i.e., characters following the digits)
    const regex = /(?<=\d)[^\d]+$/
    const match = _routeName.match(regex)

    return match
        ? [_routeName.slice(0, match.index), match[0]] // Base + suffix
        : [_routeName, ''] // No suffix found
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
