type SectionBase = {
    /** Origin station */
    origin: string
    /** Destination station */
    destination: string
    /** Estimated travel duration (in seconds) */
    duration: number
}

type ShuttleSection = SectionBase

type BusSection = SectionBase & {
    /** Route name */
    routeName: string
    /** Destination stops of the bus route */
    direction: string
}

type MetroSection = SectionBase & {
    /** Full name of the metro line */
    lineName: string
    /** Destination stations of the metro line */
    directions: string[]
}

type SectionByMethod = {
    Shuttle: ShuttleSection
    Bus: BusSection
    Metro: MetroSection
}

export type Method = keyof SectionByMethod

export type Section<M extends Method> = SectionByMethod[M]

export type RouteId = number
export type Route<M extends Method> = {
    id: RouteId
    method: M
    sections: Section<M>[]
}

export type GroupedRoutes = {
    [M in Method]: Route<M>[]
}
