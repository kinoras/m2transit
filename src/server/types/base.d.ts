import type { RouteArrival } from '@/types/arrival'
import type { Method, Route } from '@/types/route'

/** Time string in HH:mm:ss format */
export type Time = string

export type ArrivalService<M extends Method = Method> = (
    route: Route<M>
) => Promise<RouteArrival>
