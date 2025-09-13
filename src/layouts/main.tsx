'use client'

import { memo, useEffect, useState } from 'react'
import type { ComponentProps } from 'react'

import clsx from 'clsx'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { SwiperClass } from 'swiper/react'

import RouteList from '@/components/route-list'

import type { Method } from '@/types/route'

import { groupRoutesByMethod } from '@/lib/utils'
import { useStore } from '@/store'

type MainProps = ComponentProps<'main'>

const Main = ({ className, ...restProps }: MainProps) => {
    const directions = useStore((state) => state.directions)?.data
    const selectedDirectionId = useStore((state) => state.selectedDirectionId)

    const activeMethod = useStore((state) => state.activeMethod)
    const setActiveMethod = useStore((state) => state.setActiveMethod)

    const arrivalData = useStore((state) => state.arrivalData)

    const routes = groupRoutesByMethod(
        directions?.[selectedDirectionId!]?.routes ?? []
    )

    const [swiper, setSwiper] = useState<SwiperClass | null>(null)

    useEffect(() => {
        swiper?.slideTo(
            Object.keys(routes).findIndex((method) => method === activeMethod)
        )
    }, [activeMethod, routes, swiper])

    return (
        <main className={clsx('fixed inset-0', className)} {...restProps}>
            <Swiper
                className="h-full"
                onSwiper={setSwiper}
                onSlideChange={(swiper) =>
                    setActiveMethod(
                        Object.keys(routes)[swiper.realIndex] as Method
                    )
                }
            >
                {Object.entries(routes).map(([method, route]) => (
                    <SwiperSlide
                        key={method}
                        className="pt-safe-or-2 pb-safe px-safe-offset-4 overflow-scroll overscroll-contain"
                    >
                        <RouteList
                            className="pt-37 pb-14"
                            method={method as Method}
                            routes={route}
                            arrivals={arrivalData}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </main>
    )
}

export default memo(Main)
