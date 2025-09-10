import { Method } from '@/types/route'

import type { ArrivalService } from '@/server/type'

import ShuttleArrivalService from './arrivals-shuttle'

export const arrivalServices: { [M in Method]: ArrivalService<M> } = {
    Bus: async () => [],
    Metro: async () => [],
    Shuttle: ShuttleArrivalService
}
