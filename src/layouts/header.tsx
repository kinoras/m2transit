'use client'

import type { ComponentProps } from 'react'
import { memo } from 'react'

import clsx from 'clsx'

import DirectionSelect from '@/components/direction-select'
import MethodTabs from '@/components/method-tabs'

import { useStore } from '@/store'

type HeaderProps = ComponentProps<'header'>

const Header = ({ className, ...restProps }: HeaderProps) => {
    const directions = useStore((state) => state.directions)?.data ?? []
    const setSelectedDirectionId = useStore(
        (state) => state.setSelectedDirectionId
    )

    const activeMethod = useStore((state) => state.activeMethod)
    const setActiveMethod = useStore((state) => state.setActiveMethod)

    return (
        <header
            className={clsx('sticky top-0 z-10 p-4', className)}
            {...restProps}
        >
            <DirectionSelect
                className="bg-card/80 rounded-primary h-17 py-0.5 shadow-lg/5 backdrop-blur-xl dark:shadow-lg/25"
                directions={directions}
                onChange={(dir) => setSelectedDirectionId(dir?.id)}
            />
            <MethodTabs
                activeMethod={activeMethod}
                onChange={(method) => setActiveMethod(method)}
            />
        </header>
    )
}

export default memo(Header)
