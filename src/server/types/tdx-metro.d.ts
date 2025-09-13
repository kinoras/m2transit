export type ServiceDay =
    | 'Monday'
    | 'Tuesday'
    | 'Wednesday'
    | 'Thursday'
    | 'Friday'
    | 'Saturday'
    | 'Sunday'
// TODO: Get national holiday info using external data source.
//     | 'NationalHolidays'

/** TDX response */
export type StationScheduleResponse = {
    Direction: number
    Timetables: {
        /** Index of arrival. */
        Sequence: number
        /** Time of train arrival (in `HH:mm` format). */
        ArrivalTime: string
        /** Time of train departure (in `HH:mm` format). */
        DepartureTime: string
        TrainType: number
    }[]
    SrcUpdateTime: string
    UpdateTime: string
    VersionID: number
}

export type PeakFlag =
    | '0' // Off-peak hours
    | '1' // Peak hours

export type FrequencyResponse = {
    TrainType: number
    /** Array of time periods with corresponding frequency data. */
    Headways: {
        PeakFlag: PeakFlag
        /** Start time in `HH:mm` format. */
        StartTime: string
        /** End time in `HH:mm` format. */
        EndTime: string
        /** Lower bound of frequency in minutes. */
        MinHeadwayMins: number
        /** Upper bound of frequency in minutes. */
        MaxHeadwayMins: number
    }[]
    SrcUpdateTime: string
    UpdateTime: string
    VersionID: number
}

export type ServiceHoursResponse = {
    TrainType: number
    /** Time of the first train `HH:mm` format. */
    FirstTrainTime: string
    /** Time of the last train `HH:mm` format. */
    LastTrainTime: string
    SrcUpdateTime: string
    UpdateTime: string
    VersionID: number
}
