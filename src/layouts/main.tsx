'use client'

import type { ComponentProps } from 'react'
import { memo } from 'react'

import clsx from 'clsx'

import RouteList from '@/components/route-list'

import { groupRoutesByMethod } from '@/lib/utils'
import { useStore } from '@/store'

type MainProps = ComponentProps<'main'>

const Main = ({ className, ...restProps }: MainProps) => {
    const directions = useStore((state) => state.directions)?.data
    const selectedDirectionId = useStore((state) => state.selectedDirectionId)

    const activeMethod = useStore((state) => state.activeMethod)

    const arrivalData = useStore((state) => state.arrivalData)

    const routes = groupRoutesByMethod(
        directions?.[selectedDirectionId!]?.routes ?? []
    )[activeMethod]

    return (
        <main
            className={clsx('pt-safe-or-2 pb-safe px-safe-offset-4', className)}
            {...restProps}
        >
            <RouteList
                className="pt-37 pb-14"
                method={activeMethod}
                routes={routes}
                arrivals={arrivalData}
            />
        </main>
    )
}

export default memo(Main)
