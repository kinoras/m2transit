import type { ComponentProps } from 'react'

import type { Method, Section } from '@/types/route'

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
            return null // TODO: Section meta for bus.
        case 'Shuttle':
            return (
                <ShuttleSectionMeta
                    section={section as Section<'Shuttle'>}
                    {...restProps}
                />
            )
        case 'Metro':
            return null // TODO: Section meta for metro.
    }
}

export default SectionMeta
