import type { ComponentProps } from 'react'

import type { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'

type CountdownActionButtonProps = ComponentProps<'button'> & {
    /** Icon of the button. */
    icon: IconProp
}

const CountdownActionButton = ({
    icon,
    className,
    ...restProps
}: CountdownActionButtonProps) => {
    return (
        <button
            className={clsx('disabled:text-inactive transition', className)}
            {...restProps}
        >
            <FontAwesomeIcon icon={icon} />
        </button>
    )
}

export default CountdownActionButton
