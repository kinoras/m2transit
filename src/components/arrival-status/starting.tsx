import type { ComponentProps } from 'react'

import clsx from 'clsx'

import type { Arrival } from '@/types/arrival'

import { secondsToMinutes } from '@/lib/utils'

import LandingTime from './atoms/landing-time'
import MinuteText from './atoms/minute-text'
import StatusText from './atoms/status-text'

type StartingArrivalStatusProps = ComponentProps<'div'> & {
    /** Arrival data. */
    arrival: Arrival
    /** Travel duration of the section. */
    duration: number
}

const StartingArrivalStatus = ({
    arrival: { remaining, arrivalTime },
    duration,
    className,
    ...restProps
}: StartingArrivalStatusProps) => (
    <div className={clsx('text-right', className)} {...restProps}>
        {/* Arrival countdown */}
        {remaining! < 1 ? (
            <StatusText alert>進站中</StatusText> // Apporaching: arrivals within 1 minute
        ) : (
            <MinuteText
                minutes={secondsToMinutes(remaining!)}
                suffix="分"
                alert={remaining! <= 5} // Urgent: arrivals within 5 minutes
            />
        )}
        {/* Estimated arrival time at destination */}
        <LandingTime arrivalTime={arrivalTime!} duration={duration} />
    </div>
)

export default StartingArrivalStatus
