import type { ComponentProps } from 'react'

import clsx from 'clsx'

import type { Section } from '@/types/route'

import SectionMetaBase from '../base'
import MetroDirection from './direction'

type MetroSectionMetaProps = ComponentProps<'div'> & {
    /** Metro section data. */
    section: Section<'Metro'>
}

const MetroSectionMeta = ({
    section: { origin, destination, _LineID, _StationID, directions, duration },
    className,
    ...restProps
}: MetroSectionMetaProps) => {
    return (
        <div className={clsx('flex gap-3', className)} {...restProps}>
            <MetroDirection
                className="w-17"
                _LineID={_LineID}
                _StationID={_StationID}
                directions={directions}
            />
            <SectionMetaBase section={{ origin, destination, duration }} />
        </div>
    )
}

export default MetroSectionMeta
