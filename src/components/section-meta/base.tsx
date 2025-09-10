import type { ComponentProps } from 'react'

import type { SectionBase } from '@/types/route'

import { secondsToMinutes } from '@/lib/utils'

type SectionMetaBaseProps = ComponentProps<'div'> & {
    /** Base section data. */
    section: SectionBase
}

const SectionMetaBase = ({
    section: { origin, destination, duration },
    ...restProps
}: SectionMetaBaseProps) => {
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

export default SectionMetaBase
