import { getBusArrivals } from '@/server/integration/tdx/bus-arrivals'

import type { ArrivalService } from '#/types/base'

// Dayjs with default timezone set
import dayjs from '#/lib/dayjs'

export const busArrivalService: ArrivalService<'Bus'> = async (route) => {
    try {
        const { routeName, _StopUID } = route.sections[0]
        const arrival = (await getBusArrivals(routeName, _StopUID))?.[0]
        const remaining = arrival?.EstimateTime

        if (remaining !== undefined) {
            return [
                [
                    {
                        status: 'NORMAL',
                        remaining,
                        arrivalTime: dayjs(arrival?.SrcUpdateTime)
                            .add(remaining, 'seconds')
                            .unix(),
                        updateAt: dayjs(arrival?.SrcUpdateTime).unix()
                    }
                ]
            ]
        }

        switch (arrival?.StopStatus) {
            case 1:
                return [[{ status: 'AT_DEPOT' }]]
            case 2:
                return [[{ status: 'TRAFFIC_CONTROL' }]]
            case 3:
                return [[{ status: 'SERVICE_OVER' }]]
            case 4:
                return [[{ status: 'NO_SERVICE' }]]
            default:
                return []
        }
    } catch (e) {
        return []
    }
}

export default busArrivalService
