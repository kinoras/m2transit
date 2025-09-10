import type { ComponentProps } from 'react'

import clsx from 'clsx'

import type { BusSection } from '@/types/route'

import { splitBusRouteName } from '@/lib/utils'

type BusDirectionProps = ComponentProps<'div'> &
    Pick<BusSection, 'routeName' | 'direction'>

const BusDirection = ({
    routeName,
    direction,
    className,
    ...restProps
}: BusDirectionProps) => {
    const [base, suffix] = splitBusRouteName(routeName)
    return (
        <div
            className={clsx(
                'rounded-secondary bg-card-elevated overflow-hidden px-0.5',
                'flex flex-col items-center justify-center gap-1.5',
                '*:leading-none *:whitespace-nowrap',
                className
            )}
            {...restProps}
        >
            {/* Route name */}
            <p className="text-2xl">
                <span className="font-semibold">{base}</span>
                <span className="inline-block translate-x-0.5 -translate-y-px text-xs">
                    {suffix}
                </span>
            </p>
            {/* Direction */}
            <p className="text-secondary text-sm">{direction}</p>
        </div>
    )
}

export default BusDirection
