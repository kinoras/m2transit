import type { ComponentProps } from 'react'

import clsx from 'clsx'
import dayjs from 'dayjs'

type LandingTimeProps = ComponentProps<'p'> & {
    /** Unix timestamp of arrival at the origin. */
    arrivalTime: number
    /** Duration of the section. */
    duration: number
}

const LandingTime = ({
    arrivalTime,
    duration,
    className,
    ...restProps
}: LandingTimeProps) => (
    <p className={clsx('text-secondary text-sm', className)} {...restProps}>
        {dayjs.unix(arrivalTime).add(duration, 'seconds').format('HH:mm')}
        <span> 到</span>
    </p>
)

export default LandingTime
