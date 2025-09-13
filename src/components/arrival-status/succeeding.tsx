import type { ComponentProps } from 'react'

import clsx from 'clsx'

import type { Arrival } from '@/types/arrival'

import { secondsToMinutes } from '@/lib/utils'

import LandingTime from './atoms/landing-time'
import MinuteText from './atoms/minute-text'
import StatusText from './atoms/status-text'

type SucceedingArrivalStatusProps = ComponentProps<'div'> & {
    /** Arrival data. */
    arrival: Arrival
    /** Travel duration of the section. */
    duration: number
}

const SucceedingArrivalStatus = ({
    arrival: { remaining, arrivalTime },
    duration,
    className,
    ...restProps
}: SucceedingArrivalStatusProps) => (
    <div className={clsx('text-right', className)} {...restProps}>
        {/* Arrival countdown */}
        {remaining! < 60 ? (
            <StatusText>立即換乘</StatusText> // Transfer immediately (within 1 minute)
        ) : (
            <MinuteText
                prefix="到站後再"
                minutes={secondsToMinutes(remaining!)}
                suffix="分"
            />
        )}
        {/* Estimated arrival time at destination */}
        <LandingTime arrivalTime={arrivalTime!} duration={duration} />
    </div>
)

export default SucceedingArrivalStatus
