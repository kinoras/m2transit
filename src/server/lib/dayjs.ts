import _dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

_dayjs.extend(utc)
_dayjs.extend(timezone)
_dayjs.extend(customParseFormat)

_dayjs.tz.setDefault(process.env.TIMEZONE)

const dayjs = (...args: Parameters<typeof _dayjs>) => _dayjs(...args).tz()

dayjs.unix = (value: number) => _dayjs.unix(value).tz()
dayjs.duration = _dayjs.duration

export default dayjs
