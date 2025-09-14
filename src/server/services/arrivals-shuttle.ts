import type { Arrival } from '@/types/arrival'

import { shuttleSchedules } from '#/data/schedules-shuttle'

import type { ArrivalService } from '#/types/base'

// Dayjs with default timezone set
import dayjs from '#/lib/dayjs'
import { secondsDiff } from '#/lib/utils'

export const shuttleArrivalService: ArrivalService<'Shuttle'> = async (
    route
) => {
    const now = dayjs()
    const nowTime = now.format('HH:mm:ss')

    const schedules = shuttleSchedules[route.id]

    // TODO: Get national holiday info using external data source.
    const isHoliday = [0, 6].includes(now.day())

    if (isHoliday) {
        // No shuttle bus on weekends
        return [[{ status: 'NO_SERVICE' }]]
    }

    const futureArrivals: Arrival[] = schedules
        .filter((t) => t > nowTime) // Get future schedules
        .slice(0, 2) // Select the most recent ones
        .map((scheduledTime) => {
            // Compute the remaining seconds
            const remaining = secondsDiff(nowTime, scheduledTime)
            return {
                status: 'NORMAL',
                remaining,
                arrivalTime: now.add(remaining, 'seconds').unix(),
                updateAt: dayjs().unix()
            }
        })

    return futureArrivals.length === 0
        ? [[{ status: 'SERVICE_OVER' }]] // No future arrivals
        : [futureArrivals]
}

export default shuttleArrivalService
