import type { Area, Direction, Location } from '@/types/direction'

import shuttleRoutes from './routes-shuttle'

export const areas: Area[] = [
    { id: 0, name: '城中校區' },
    { id: 1, name: '校總區' }
]

export const locations: Location[] = [
    { id: 0, name: '男二舍/公衛', area: areas[0] },
    { id: 1, name: '西側/公館', area: areas[1] },
    { id: 2, name: '東側/資訊館', area: areas[1] }
]

export const directions: Direction[] = [
    {
        id: 0,
        origin: locations[0],
        destination: locations[1],
        routes: [shuttleRoutes[0], shuttleRoutes[1]]
    },
    {
        id: 1,
        origin: locations[0],
        destination: locations[2],
        routes: [shuttleRoutes[0], shuttleRoutes[1]]
    },
    {
        id: 2,
        origin: locations[1],
        destination: locations[0],
        routes: [shuttleRoutes[2], shuttleRoutes[3]]
    },
    {
        id: 3,
        origin: locations[2],
        destination: locations[0],
        routes: [shuttleRoutes[2], shuttleRoutes[3]]
    }
]
