'use client'

import { useEffect, useState } from 'react'
import type { ComponentProps } from 'react'

import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'

import type { Direction, LocationId } from '@/types/direction'

import LocationSelect from './location-select'

type DirectionSelectProps = Omit<ComponentProps<'div'>, 'onChange'> & {
    /** Array of directions to be selected */
    directions: Direction[]
    /** Callback function invoked when the direction selection changes */
    onChange?: (direction?: Direction) => void
}

const DirectionSelect = ({
    className,
    directions,
    onChange,
    ...restProps
}: DirectionSelectProps) => {
    const [originId, setOriginId] = useState<LocationId>()
    const [destinationId, setDestinationId] = useState<LocationId>()

    // Update direction when location selection changes
    useEffect(() => {
        const direction = directions.find(
            (dir) =>
                dir.origin.id == originId && dir.destination.id == destinationId
        )
        onChange?.(direction)
    }, [originId, destinationId, directions, onChange])

    return (
        <div className={clsx('flex items-center', className)} {...restProps}>
            {/* Origin location selector */}
            <LocationSelect
                className="flex-1"
                options={[
                    // Extract all unique origins from directions by removing duplicates
                    ...new Map(
                        directions.map((dir) => [dir.origin.id, dir.origin])
                    ).values()
                ]}
                onChange={(loc) => setOriginId(loc?.id)}
            />

            {/* Arrow icon */}
            <FontAwesomeIcon
                icon={faArrowRight}
                className="text-secondary"
                style={{ height: 20 }} // Prevents flickering (see Next.js Issue #48879)
            />

            {/* Destination location selector */}
            <LocationSelect
                className="flex-1"
                options={
                    // Only show destinations available for the currently selected origin
                    directions
                        .filter((dir) => dir.origin.id === originId)
                        .map((dir) => dir.destination)
                }
                onChange={(loc) => setDestinationId(loc?.id)}
            />
        </div>
    )
}

export default DirectionSelect
