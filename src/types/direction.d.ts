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
export type Direction = {
    id: DirectionId
    origin: Location
    destination: Location
}
