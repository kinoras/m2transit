type SectionBase = {
    /** Origin station */
    origin: string
    /** Destination station */
    destination: string
    /** Estimated travel duration (in seconds) */
    duration: number
}

type ShuttleSection = SectionBase

type SectionByMethod = {
    Shuttle: ShuttleSection
}

export type Method = keyof SectionByMethod

export type Section<M extends Method> = SectionByMethod[M]

export type RouteId = number
export type Route<M extends Method> = {
    id: RouteId
    method: M
    sections: Section<M>[]
}
