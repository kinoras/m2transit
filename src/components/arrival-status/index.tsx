import type { ComponentProps } from 'react'

import type { Arrival } from '@/types/arrival'

import Fallback from './atoms/fallback'
import StartingArrivalStatus from './starting'
import SucceedingArrivalStatus from './succeeding'

type ArrivalStatusProps = ComponentProps<'div'> & {
    /** Arrival data. */
    arrival: Arrival
    /** Travel duration of the section. */
    duration: number
    /** Whether the section is the first one. */
    succeeding?: boolean
}

const ArrivalStatus = ({
    arrival,
    duration,
    succeeding,
    ...restProps
}: ArrivalStatusProps) => {
    const { status, remaining } = arrival

    return remaining === undefined ? (
        // Show fallback when arrival data is not yet available
        <Fallback status={status} {...restProps} />
    ) : !succeeding ? (
        <StartingArrivalStatus
            arrival={arrival}
            duration={duration}
            {...restProps}
        />
    ) : (
        <SucceedingArrivalStatus
            arrival={arrival}
            duration={duration}
            {...restProps}
        />
    )
}

ArrivalStatus.Fallback = Fallback

export default ArrivalStatus
