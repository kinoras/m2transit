import type { ComponentProps } from 'react'

import clsx from 'clsx'

type CountdownProgressProps = ComponentProps<'div'> & {
    /** Current remaining countdown value. */
    current: number
    /** Total duration of the countdown. */
    duration: number
    /** Whether the countdown is paused. */
    inactive?: boolean
}

const CountdownProgress = ({
    current,
    duration,
    inactive,
    className,
    ...restProps
}: CountdownProgressProps) => {
    return (
        <div
            className={clsx('bg-tertiary h-0.5 rounded-full', className)}
            {...restProps}
        >
            <div
                className={clsx(
                    'h-0.5 rounded-full transition-all duration-500',
                    !inactive ? 'bg-primary' : 'bg-inactive'
                )}
                style={{ width: `${((current - 1) / (duration - 1)) * 100}%` }}
            />
        </div>
    )
}

export default CountdownProgress
