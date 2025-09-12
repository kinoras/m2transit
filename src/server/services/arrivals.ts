import type { Method, Route } from '@/types/route'

import type { ArrivalService } from '#/types/base'

import busArrivalService from './arrivals-bus'
import shuttleArrivalService from './arrivals-shuttle'

export const arrivalServices: { [M in Method]: ArrivalService<M> } = {
    Bus: busArrivalService,
    Metro: async () => [],
    Shuttle: shuttleArrivalService
}

export const getArrivalServices = async (route: Route<Method>) => {
    switch (route.method) {
        case 'Bus':
            return arrivalServices.Bus(route as Route<'Bus'>)
        case 'Metro':
            return arrivalServices.Metro(route as Route<'Metro'>)
        case 'Shuttle':
            return await arrivalServices.Shuttle(route as Route<'Shuttle'>)
    }
}
