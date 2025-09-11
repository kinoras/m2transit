import type { ComponentProps } from 'react'

import type { Arrival } from '@/types/arrival'

import Fallback from './atoms/fallback'
import StartingArrivalStatus from './starting'

type ArrivalStatusProps = ComponentProps<'div'> & {
    /** Arrival data. */
    arrival: Arrival
    /** Travel duration of the section. */
    duration: number
}

const ArrivalStatus = ({
    arrival,
    duration,
    ...restProps
}: ArrivalStatusProps) => {
    const { status, remaining } = arrival

    return remaining === undefined ? (
        // Show fallback when arrival data is not yet available
        <Fallback status={status} {...restProps} />
    ) : (
        <StartingArrivalStatus
            arrival={arrival}
            duration={duration}
            {...restProps}
        />
    )
}

ArrivalStatus.Fallback = Fallback

export default ArrivalStatus
