import type { RouteId } from './route'

export type ArrivalState =
    | 'NORMAL'
    | 'AT_DEPOT'
    | 'TRAFFIC_CONTROL'
    | 'SERVICE_OVER'
    | 'NO_SERVICE'

export type Arrival = {
    /** State of arrival. */
    status: ArrivalState
    /** Remaining seconds until arrival. */
    remaining?: number
    /** Unix timestamp of the estimated arrival time. */
    arrivalTime?: number
    /** Unix timestamp of the last update to the data. */
    updateAt?: number
}

export type SectionArrival = Arrival[]
export type RouteArrival = SectionArrival[]

export type ArrivalObject = {
    id: RouteId
    arrivals: RouteArrival
}
