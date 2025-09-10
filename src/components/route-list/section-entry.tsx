import type { ComponentProps } from 'react'

import clsx from 'clsx'

import SectionMeta from '@/components/section-meta'

import type { Method, Section } from '@/types/route'

type SectionEntryProps<M extends Method> = ComponentProps<'div'> & {
    /** The method of the belonging route. */
    method: M
    /** Section data. */
    section: Section<M>
}

const SectionEntry = <M extends Method>({
    method,
    section,
    className,
    ...restProps
}: SectionEntryProps<M>) => {
    return (
        <div
            className={clsx('flex items-center gap-2', className)}
            {...restProps}
        >
            <SectionMeta method={method} section={section} />
            {/* TODO: Arrival status. */}
        </div>
    )
}

export default SectionEntry
