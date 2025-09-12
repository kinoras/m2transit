type BusDirection =
    | 0 // Outbound
    | 1 // Inbound
    | 2 // Loop
    | 10 // Circular
    | 255 // Unknown

type BusStopStatus =
    | 0 // Normal
    | 1 // At depot
    | 2 // Traffic control
    | 3 // Service over
    | 4 // No service

/** TDX responses */
export type BusArrivalResponse = {
    /** Direction of the bus. */
    Direction: BusDirection
    /** Estimated remaining seconds until arrival. */
    EstimateTime?: number
    /** Arrival status. */
    StopStatus: BusStopStatus
    /** Time of update. */
    SrcUpdateTime: string
    UpdateTime: string
}
