'use client'

import type { ComponentProps } from 'react'
import { memo } from 'react'

import clsx from 'clsx'

import type { Method } from '@/types/route'

import MethodTabsItem from './item'

const methods: Readonly<Method[]> = ['Shuttle', 'Bus', 'Metro']

type MethodTabsProps = Omit<ComponentProps<'ul'>, 'onChange'> & {
    /** Currently selected transit method. */
    activeMethod: Method
    /** Callback function invoked when the method selection changes. */
    onChange?: (method?: Method) => void
}

const MethodTabs = ({
    activeMethod,
    onChange,
    className,
    ...restProps
}: MethodTabsProps) => {
    const activeIndex = methods.findIndex((method) => method === activeMethod)
    return (
        <ul
            className={clsx('relative flex *:flex-1', className)}
            {...restProps}
        >
            {/* Tab items */}
            {methods.map((method) => (
                <MethodTabsItem
                    key={method}
                    active={activeMethod === method}
                    method={method}
                    onClick={() => onChange?.(method)}
                />
            ))}
            {/* Sliding indicator bar */}
            <div
                className="bg-primary absolute -bottom-0.25 h-0.5 rounded-full transition duration-300"
                style={{
                    width: `${100 / methods.length}%`, // Equal portion for each tab
                    translate: `${100 * activeIndex}%` // Position the indicator at active tab
                }}
            />
        </ul>
    )
}

export default memo(MethodTabs)
