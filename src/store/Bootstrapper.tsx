'use client'

import { useEffect } from 'react'

import dayjs from 'dayjs'

import { useHydration } from '@/store/useHydration'

import { fetchDirections } from '@/lib/fetcher'
import { useStore } from '@/store'

/**
 * Storage bootstrapper
 *
 * This component:
 * 1. Checks whether persisted data is ready and not expired after it is hydrated.
 * 2. Fetch fresh data if persisted data is missing or expired.
 */
const Bootstrapper = () => {
    const hydrated = useHydration()

    const directions = useStore((state) => state.directions)
    const setDirections = useStore((state) => state.setDirections)

    useEffect(() => {
        // Wait until persisted data hydrated from storage
        if (!hydrated) return

        const now = dayjs()

        // If directions are missing or expired, re-fetch and cache
        if (!directions || directions.expiry < now.unix())
            fetchDirections().then(({ data, ttl = 0 }) => {
                const expiry = now.add(ttl, 'seconds').unix()
                setDirections(data, expiry)
            })
    }, [hydrated])

    return null
}

export default Bootstrapper
