import type { ComponentProps } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'

import type { Method } from '@/types/route'

import { methodLabels } from '@/lib/const'

type MethodTabsItemProps = ComponentProps<'li'> & {
    /** Whether this tab is currently selected. */
    active?: boolean
    /** The transit method this tab represents. */
    method: Method
}

const MethodTabsItem = ({
    active,
    method,
    className,
    ...restProps
}: MethodTabsItemProps) => {
    // Get icon and display name from configuration
    const { icon, name } = methodLabels[method]
    
    return (
        <li
            className={clsx(
                'flex items-center justify-center gap-1 py-5 text-center transition-all',
                active ? 'font-medium' : 'text-inactive',
                className
            )}
            {...restProps}
        >
            <FontAwesomeIcon
                className="h-4 w-5 translate-y-[0.5px]"
                icon={icon}
            />
            <span className="leading-none">{name}</span>
        </li>
    )
}

export default MethodTabsItem
