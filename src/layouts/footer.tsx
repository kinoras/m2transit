import clsx from 'clsx'

import Countdown from '@/components/countdown'

const Footer = () => {
    return (
        <footer
            className={clsx(
                'fixed inset-x-0 bottom-0 z-10 pt-4 text-center',
                'pb-safe px-safe',
                'has-backdrop before:-top-2 before:bg-gradient-to-t before:mask-linear-0'
            )}
        >
            <Countdown />
        </footer>
    )
}

export default Footer
