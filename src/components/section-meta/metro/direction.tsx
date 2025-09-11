import type { ComponentProps } from 'react'

import clsx from 'clsx'

import { MetroSection } from '@/types/route'

import { metroStyles } from '@/lib/const'

type MetroDirectionProps = ComponentProps<'div'> &
    Pick<MetroSection, '_LineID' | '_StationID' | 'directions'>

const MetroDirection = ({
    _LineID,
    _StationID,
    directions: [direction],
    className,
    ...restProps
}: MetroDirectionProps) => {
    return (
        <div
            className={clsx(
                'flex flex-col justify-center gap-1.5',
                'text-center *:overflow-hidden *:whitespace-nowrap',
                className
            )}
            {...restProps}
        >
            {/* Station ID in corresponding line color */}
            <span
                className={clsx(
                    'rounded-secondary mt-0.5 pb-px leading-7.5 font-semibold',
                    metroStyles[_LineID]
                )}
            >
                {_StationID}
            </span>
            {/* Direction */}
            <span
                className={clsx(
                    'text-secondary -mx-1 leading-3.5',
                    direction?.length <= 4 ? 'text-sm' : 'text-xs'
                )}
            >
                {direction}
            </span>
        </div>
    )
}

export default MetroDirection
