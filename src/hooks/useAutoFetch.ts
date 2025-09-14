'use-client'

import { useEffect, useState } from 'react'

import dayjs from 'dayjs'

import { fetchArrivals } from '@/lib/fetcher'
import { useStore } from '@/store'

import { useInterval } from './useInterval'

type AutoFetchApi = {
    /** Whether fetching. */
    fetching: boolean
    /** Whether the countdown timer is running. */
    counting: boolean
    /** Unix timestamp of the latest fetching. */
    lastFetched: number
    /** Remaining seconds until the next fetching. */
    remaining: number
    /** Manually fetch the arrival data immediately. */
    fetchNow: () => void
    /** Pause the countdown. */
    pause: () => void
    /** Resume the countdown. */
    resume: () => void
}

/**
 * Custom hook that schedules arrival data fetching.
 *
 * @param duration - Interval in seconds.
 * @returns The states and control functions of the scheduler.
 */
export function useAutoFetch(duration: number): AutoFetchApi {
    const [_timerToggle, _setTimerToggle] = useState(false)

    // Use global store
    const selectedDirectionId = useStore((store) => store.selectedDirectionId)
    const setArrivalData = useStore((store) => store.setArrivalData)

    // Internal status
    const [fetching, setExecuting] = useState(false)
    const [lastFetched, setLastExecution] = useState(dayjs().unix())

    const fetchNow = async () => {
        // Prevent multiple execution
        if (fetching) return

        if (selectedDirectionId === undefined) return

        // Stop the timer
        pause()
        setExecuting(true)

        setArrivalData(await fetchArrivals(selectedDirectionId))

        // Restart the timer
        restart()
        setExecuting(false)
        setLastExecution(dayjs().unix())
    }

    useEffect(() => {
        fetchNow()
    }, [selectedDirectionId, _timerToggle])

    const {
        remaining,
        running: counting,
        start: resume,
        stop: pause,
        restart
    } = useInterval(duration, () => _setTimerToggle(!_timerToggle))

    return {
        fetching,
        counting,
        lastFetched,
        remaining,
        fetchNow,
        pause,
        resume
    }
}

export default useAutoFetch
