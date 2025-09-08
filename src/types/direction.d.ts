import { Route } from './route'

export type AreaId = number
export type Area = {
    id: AreaId
    name: string
}

export type LocationId = number
export type Location = {
    id: LocationId
    name: string
    area: Area
}

export type DirectionId = number
export type DirectionBase = {
    id: DirectionId
    origin: Location
    destination: Location
}
export type Direction = DirectionBase & {
    routes: Route[]
}
