import type { ComponentProps } from 'react'

import clsx from 'clsx'

type CountdownProgressProps = ComponentProps<'div'> & {
    /** Current remaining countdown value. */
    current: number
    /** Total duration of the countdown. */
    duration: number
}

const CountdownProgress = ({
    current,
    duration,
    className,
    ...restProps
}: CountdownProgressProps) => {
    return (
        <div
            className={clsx('bg-tertiary h-0.5 rounded-full', className)}
            {...restProps}
        >
            <div
                className="bg-primary h-0.5 rounded-full transition-all duration-500"
                style={{ width: `${((current - 1) / (duration - 1)) * 100}%` }}
            />
        </div>
    )
}

export default CountdownProgress
