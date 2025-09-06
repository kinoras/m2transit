'use client'

import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import type { ComponentProps } from 'react'

import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'

import type { Direction, Location, LocationId } from '@/types/direction'

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

    // Extract all unique origins from directions by removing duplicates
    const uniqueOrigins = useMemo(() => {
        const map = new Map(directions.map(({ origin }) => [origin.id, origin]))
        return [...map.values()]
    }, [directions])

    // Only show destinations available for the currently selected origin
    const availableDestinations = useMemo(() => {
        return directions
            .filter((dir) => dir.origin.id === originId)
            .map((dir) => dir.destination)
    }, [directions, originId])

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
                options={uniqueOrigins}
                onChange={useCallback((loc?: Location) => {
                    setOriginId(loc?.id)
                }, [])}
            />

            {/* Arrow icon */}
            <FontAwesomeIcon
                icon={faArrowRight}
                className="text-secondary"
                style={{ height: 20 }} // Prevents flickering (see Next.js Issue #48879)
            />

            {/* Destination location selector */}
            <LocationSelect
                className="a flex-1"
                options={availableDestinations}
                onChange={useCallback((loc?: Location) => {
                    setDestinationId(loc?.id)
                }, [])}
            />
        </div>
    )
}

export default memo(DirectionSelect)
