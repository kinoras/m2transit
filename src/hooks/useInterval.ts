import { useEffect, useRef, useState } from 'react'

type IntervalApi = {
    /** Current remaining time in seconds. */
    remaining: number
    /** Whether the timer is currently running. */
    running: boolean
    /** Start the countdown timer. */
    start: () => void
    /** Pause the timer. */
    stop: () => void
    /** Reset the timer. */
    reset: () => void
    /** Restart (reset and start) the timer. */
    restart: () => void
}

/**
 * Custom hook for countdown timer functionality.
 *
 * Behaviors:
 * - The timer stops after reset.
 * - The timer will NOT stop after restart.
 * - When the timer reaches zero, it **restarts**.
 *
 * @param duration - Interval duration in seconds.
 * @param onComplete - Optional callback when the timer reaches zero.
 * @returns The state and control functions of the timer.
 */
export const useInterval = (
    duration: number,
    onComplete?: () => void
): IntervalApi => {
    const [remaining, setRemaining] = useState<number>(duration)
    const [running, setRunning] = useState<boolean>(false)
    const intervalRef = useRef<NodeJS.Timeout>(null)

    /** Starts the timer. */
    const start = () => {
        // Start the timer
        setRunning(true)

        // Prevent multiple intervals
        if (intervalRef.current) return

        // Set the interval
        intervalRef.current = setInterval(() => {
            setRemaining((prev) => {
                // Timer completed
                if (prev <= 1) {
                    onComplete?.() // Trigger callback
                    return duration // Reset
                }
                // Not completed
                return prev - 1
            })
        }, 1000)
    }

    const stop = () => {
        // Stop the timer
        setRunning(false)

        // Clear the interval
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
        }
    }

    /** Reset the timer to initial duration. */
    const reset = () => {
        setRemaining(duration)
        stop()
    }

    /** Reset the timer to initial duration (without stopping). */
    const restart = () => {
        setRemaining(duration)
        start()
    }

    useEffect(() => {
        start() // Start the timer on mount automatically
        return () => stop() // Cleanup on unmount
    }, [])

    return { remaining, running, start, stop, reset, restart }
}

export default useInterval
