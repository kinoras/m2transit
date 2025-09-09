import type { ComponentProps } from 'react'

import type { Method, Route } from '@/types/route'

import SectionEntry from './section-entry'

type RouteListProps<M extends Method> = ComponentProps<'section'> & {
    /** The method of the routes in the list. */
    method: M
    /** The list of routes. */
    routes: Route<M>[]
}

const RouteList = <M extends Method>({
    method,
    routes,
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
                            method={method}
                            section={section}
                        />
                    ))}
                </article>
            ))}
        </section>
    )
}

export default RouteList
