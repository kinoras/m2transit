import type { ComponentProps } from 'react'

import clsx from 'clsx'

type MinuteTextProps = ComponentProps<'p'> & {
    /** Minutes. */
    minutes: number
    /** Text before the minute number. */
    prefix?: string
    /** Text after the minute number. */
    suffix?: string
    /** Whether the text should be styled as an alert. */
    alert?: boolean
}

const MinuteText = ({
    minutes,
    prefix,
    suffix,
    alert,
    className,
    ...restProps
}: MinuteTextProps) => (
    <p
        className={clsx(
            'my-0.5 h-6 font-semibold',
            alert && 'text-danger',
            className
        )}
        {...restProps}
    >
        <span>{prefix} </span>
        <span className="inline-block translate-y-px text-2xl leading-none">
            {minutes}
        </span>
        <span> {suffix}</span>
    </p>
)

export default MinuteText
