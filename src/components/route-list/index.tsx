import type { ComponentProps } from 'react'

import type { ArrivalObject } from '@/types/arrival'
import type { Method, Route } from '@/types/route'

import SectionEntry from './section-entry'

type RouteListProps<M extends Method> = ComponentProps<'section'> & {
    /** The method of the routes in the list. */
    method: M
    /** The list of routes. */
    routes: Route<M>[]
    /** Arrival information */
    arrivals: ArrivalObject[]
}

// Get section arrivals
const getArrivals = (
    arrivals: ArrivalObject[],
    routeId: number,
    sectionIndex: number
) => {
    return arrivals.find(({ id }) => id === routeId)?.arrivals?.[sectionIndex]
}

const RouteList = <M extends Method>({
    method,
    routes,
    arrivals,
    ...restProps
}: RouteListProps<M>) => {
    return (
        /** List of routes */
        <section {...restProps}>
            {routes?.map(({ id: routeId, sections }) => (
                /** Single route = List of sections */
                <article
                    key={routeId}
                    className="bg-card rounded-primary mb-4 px-4 py-3"
                >
                    {sections.map((section, index) => (
                        <SectionEntry
                            key={`${routeId}-${index}`}
                            className="not-first:border-tertiary not-first:mt-3 not-first:border-t not-first:pt-3"
                            method={method}
                            section={section}
                            arrivals={getArrivals(arrivals, routeId, index)}
                        />
                    ))}
                </article>
            ))}
        </section>
    )
}

export default RouteList
