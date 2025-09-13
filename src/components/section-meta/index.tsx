import { memo } from 'react'
import type { ComponentProps } from 'react'

import type { Method, Section } from '@/types/route'

import BusSectionMeta from './bus'
import MetroSectionMeta from './metro'
import ShuttleSectionMeta from './shuttle'

type SectionMetaProps = ComponentProps<'div'> & {
    /** The method of the belonging route. */
    method: Method
    /** Section data. */
    section: Section<Method>
}

const SectionMeta = ({ method, section, ...restProps }: SectionMetaProps) => {
    switch (method) {
        case 'Bus':
            return (
                <BusSectionMeta
                    section={section as Section<'Bus'>}
                    {...restProps}
                />
            )
        case 'Shuttle':
            return (
                <ShuttleSectionMeta
                    section={section as Section<'Shuttle'>}
                    {...restProps}
                />
            )
        case 'Metro':
            return (
                <MetroSectionMeta
                    section={section as Section<'Metro'>}
                    {...restProps}
                />
            )
    }
}

export default memo(SectionMeta)
