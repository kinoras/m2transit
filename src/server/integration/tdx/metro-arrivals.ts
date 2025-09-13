import dayjs from 'dayjs'

import { ServiceDay } from '#/types/tdx-metro'

import { toExtendedDateAndSeconds } from '#/lib/utils'

import { getStationSchedules } from './metro-schedules'

/**
 * Computes the next available metro train arrival time for a given metro line, station, and destination(s).
 *
 * @param line - TDX LindID field.
 * @param station - TDX StationID field.
 * @param destinations - Array of TDX DestinationStaionID fields.
 * @param timestamp - Time of querying (Unix timestamp).
 * @returns The Unix timestamp of the next train arrival, or `undefined` if server over.
 */
export const computeMetroArrival = async (
    line: string,
    station: string,
    destinations: string[],
    timestamp: number
) => {
    // Handles times crossing midnight
    const [date, seconds] = toExtendedDateAndSeconds(dayjs.unix(timestamp))

    // TODO: Get national holiday info using external data source.
    const serviceDay = dayjs(date).format('dddd') as ServiceDay

    // Retrieve schedules for the requested day
    const schdules = await getStationSchedules(
        line,
        station,
        destinations,
        serviceDay
    )

    // Find arrival time of the next train
    const nextTrain = schdules.find((arrival) => arrival >= seconds)

    return nextTrain // See if there are future arrivals
        ? dayjs(date).startOf('day').unix() + nextTrain // Return the timestamp
        : undefined // Service over
}
