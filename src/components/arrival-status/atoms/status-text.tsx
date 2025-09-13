import type { ComponentProps } from 'react'

import clsx from 'clsx'

type StatusTextProps = ComponentProps<'p'> & {
    /** Whether the text should be styled as an alert */
    alert?: boolean
}

const StatusText = ({
    alert,
    children,
    className,
    ...restProps
}: StatusTextProps) => (
    <p
        className={clsx(
            'mb-1 h-6 text-lg font-semibold',
            alert && 'text-danger',
            className
        )}
        {...restProps}
    >
        {children}
    </p>
)

export default StatusText
