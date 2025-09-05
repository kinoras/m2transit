import { useCallback, useEffect, useState } from 'react'

import clsx from 'clsx'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { SwiperClass, SwiperProps } from 'swiper/react'

import type { Location } from '@/types/direction'

type LocationSelectProps = Omit<SwiperProps, 'onChange'> & {
    /** Array of locations to display in the selector */
    options: Location[]
    /** Callback function invoked when a different location is selected */
    onChange?: (location?: Location) => void
}

const LocationSelect = ({
    className,
    options,
    onChange,
    ...otherProps
}: LocationSelectProps) => {
    const [swiper, setSwiper] = useState<SwiperClass | null>(null)

    const handleSlideChange = useCallback(
        (realIndex: number) => {
            const location = options[realIndex] // Find the selected location using the slide index
            onChange?.(location)
        },
        [options, onChange]
    )

    // Update selection in two scenarios:
    useEffect(() => {
        if (swiper) handleSlideChange(swiper.realIndex)
    }, [
        swiper, // Swiper initialization: Since selection data is not yet synchronized with the active slide.
        options, // Options change: If the previous selection is unavailable, it jumps to another slide and requires syncing.
        handleSlideChange
    ])

    return (
        <Swiper
            onSwiper={setSwiper}
            className={clsx('h-full mask-y-from-80% mask-y-to-100%', className)}
            direction="vertical"
            onSlideChange={(swiper) => handleSlideChange(swiper.realIndex)}
            {...otherProps}
        >
            {options.map((option) => (
                <SwiperSlide
                    key={option.id}
                    className="flex! cursor-pointer flex-col items-center justify-center gap-2"
                >
                    <span className="text-secondary text-sm leading-none">
                        {option.area.name}
                    </span>
                    <span className="text-lg leading-none font-semibold">
                        {option.name}
                    </span>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default LocationSelect
