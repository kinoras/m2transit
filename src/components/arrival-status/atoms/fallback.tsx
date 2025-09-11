import type { ComponentProps } from 'react'

import clsx from 'clsx'

import type { ArrivalState } from '@/types/arrival'

import { arrivalDescriptions } from '@/lib/const'

type FallbackProps = ComponentProps<'p'> & {
    /** Current arrival status */
    status?: ArrivalState
}

const Fallback = ({ status, className, ...restProps }: FallbackProps) => (
    <p
        className={clsx(
            'text-inactive pb-px text-lg leading-none',
            !status && 'animate-pulse', // Undetermined animation
            className
        )}
        {...restProps}
    >
        {arrivalDescriptions[status!] ?? '—'}
    </p>
)

export default Fallback
