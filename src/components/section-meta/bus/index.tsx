import type { ComponentProps } from 'react'

import clsx from 'clsx'

import type { Section } from '@/types/route'

import SectionMetaBase from '../base'
import BusDirection from './direction'

type BusSectionMetaProps = ComponentProps<'div'> & {
    /** Bus section data. */
    section: Section<'Bus'>
}

const BusSectionMeta = ({
    section: { origin, destination, routeName, direction, duration },
    className,
    ...restProps
}: BusSectionMetaProps) => {
    return (
        <div className={clsx('flex gap-3', className)} {...restProps}>
            <BusDirection
                className="-mx-0.5 w-18"
                routeName={routeName}
                direction={direction}
            />
            <SectionMetaBase section={{ origin, destination, duration }} />
        </div>
    )
}

export default BusSectionMeta
