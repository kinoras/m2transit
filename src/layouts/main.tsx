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

    const routes = groupRoutesByMethod(
        directions?.[selectedDirectionId!]?.routes ?? []
    )[activeMethod]

    return (
        <main
            className={clsx('overflow-scroll px-4 pt-39 pb-14', className)}
            {...restProps}
        >
            <RouteList method={activeMethod} routes={routes} />
        </main>
    )
}

export default memo(Main)
