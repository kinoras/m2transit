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
