import type { ComponentProps } from 'react'

import type { Section } from '@/types/route'

import { secondsToMinutes } from '@/lib/utils'

type ShuttleSectionMetaProps = ComponentProps<'div'> & {
    /** Shuttle section data. */
    section: Section<'Shuttle'>
}

const ShuttleSectionMeta = ({
    section: { origin, destination, duration },
    ...restProps
}: ShuttleSectionMetaProps) => {
    return (
        <div {...restProps}>
            {/* Origin station */}
            <h4 className="mb-px text-lg leading-6 font-semibold">{origin}</h4>
            {/* Destination station*/}
            <p className="text-secondary text-sm">往{destination}</p>
            {/* Estimated travel duration */}
            <p className="text-secondary text-sm">
                約 {secondsToMinutes(duration)} 分鐘
            </p>
        </div>
    )
}

export default ShuttleSectionMeta
