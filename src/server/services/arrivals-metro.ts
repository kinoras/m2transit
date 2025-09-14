import type { RouteArrival } from '@/types/arrival'

import { computeMetroArrival } from '#/integration/tdx/metro-arrivals'

import type { ArrivalService } from '#/types/base'

// Dayjs with default timezone set
import dayjs from '#/lib/dayjs'

export const metroArrivalService: ArrivalService<'Metro'> = async (route) => {
    try {
        // Start from the next minute of the request
        let timestamp: number = dayjs().unix()
        // Service over flag
        let isServiceOver: boolean = false

        const arrivals = [] as RouteArrival

        for await (const section of route.sections) {
            const {
                duration,
                transferTime,
                _LineID,
                _StationID,
                _DestinationStationIDs
            } = section

            // Consider transfer time
            timestamp += transferTime

            // Compute the next arrival time for this section
            const arrival = await computeMetroArrival(
                _LineID,
                _StationID,
                _DestinationStationIDs,
                timestamp
            )

            // If service is over for any section, mark and break
            if (arrival === undefined) {
                isServiceOver = true
                break
            }

            // Push arrival info for this section
            arrivals.push([
                {
                    status: 'NORMAL',
                    remaining: arrival - timestamp,
                    arrivalTime: arrival,
                    updateAt: dayjs().unix()
                }
            ])

            // Update timestamp for the next section (add travel duration)
            timestamp = arrival + duration
        }

        return !isServiceOver
            ? arrivals // Return computed arrivals
            : route.sections.map(() => [{ status: 'SERVICE_OVER' }]) // Mark all sections as service over
    } catch (e) {
        return []
    }
}

export default metroArrivalService
