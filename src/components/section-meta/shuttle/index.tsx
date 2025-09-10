import type { ComponentProps } from 'react'

import type { Section } from '@/types/route'

import SectionMetaBase from '../base'

type ShuttleSectionMetaProps = ComponentProps<'div'> & {
    /** Shuttle section data. */
    section: Section<'Shuttle'>
}

const ShuttleSectionMeta = ({
    section,
    ...restProps
}: ShuttleSectionMetaProps) => {
    return (
        <div {...restProps}>
            <SectionMetaBase section={section} />
        </div>
    )
}

export default ShuttleSectionMeta
