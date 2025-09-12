import type { ComponentProps } from 'react'

import clsx from 'clsx'

import ArrivalStatus from '@/components/arrival-status'
import SectionMeta from '@/components/section-meta'

import type { SectionArrival } from '@/types/arrival'
import type { Method, Section } from '@/types/route'

type SectionEntryProps<M extends Method> = ComponentProps<'div'> & {
    /** The method of the belonging route. */
    method: M
    /** Section data. */
    section: Section<M>
    /** Arrival info of the section */
    arrivals?: SectionArrival
}

const SectionEntry = <M extends Method>({
    method,
    section,
    arrivals,
    className,
    ...restProps
}: SectionEntryProps<M>) => {
    return (
        <div
            className={clsx('flex items-center gap-2', className)}
            {...restProps}
        >
            {/* Section metadata */}
            <SectionMeta className="flex-1" method={method} section={section} />

            {/* Arrival status */}
            {arrivals?.map((arrival, index) => (
                <ArrivalStatus
                    key={index}
                    className="shrink-0 basis-20 text-right"
                    arrival={arrival}
                    duration={section.duration}
                />
            )) ?? (
                // Fallback when arrival data is unavailable
                <ArrivalStatus.Fallback />
            )}
        </div>
    )
}

export default SectionEntry
