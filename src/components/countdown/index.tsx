'use client'

import type { ComponentProps } from 'react'

import {
    faRotateRight,
    faPause,
    faPlay
} from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import dayjs from 'dayjs'

import useAutoFetch from '@/hooks/useAutoFetch'

import CountdownActionButton from './action-button'
import CountdownProgress from './progress'

type CountdownProps = ComponentProps<'div'> & {
    /** Total duration of the countdown */
    duration?: number
}

const Countdown = ({
    duration = 15,
    className,
    ...restProps
}: CountdownProps) => {
    const {
        fetching,
        counting,
        remaining,
        lastFetched,
        fetchNow,
        pause,
        resume
    } = useAutoFetch(duration)

    return (
        <div className={clsx('mx-4', className)} {...restProps}>
            <CountdownProgress current={remaining} duration={duration} />
            <p className="-mx-4 flex h-12 justify-center">
                <CountdownActionButton
                    className="px-4 text-xs"
                    icon={faRotateRight}
                    onClick={fetchNow}
                    disabled={fetching}
                />
                <span className="self-center text-sm tabular-nums">
                    最後更新：
                    {dayjs.unix(lastFetched).format('YYYY-MM-DD HH:mm:ss')}
                </span>
                <CountdownActionButton
                    className="scale-105 px-4 text-xs"
                    icon={counting || fetching ? faPause : faPlay}
                    onClick={counting ? pause : resume}
                />
            </p>
        </div>
    )
}

export default Countdown
