import { useEffect, useState } from 'react'

import { useStore } from '@/store'

/**
 * Custom hook to check if the store has been hydrated.
 *
 * @returns True when the store has finished hydration, false otherwise.
 *
 * @see {@link https://zustand.docs.pmnd.rs/integrations/persisting-store-data#how-can-i-check-if-my-store-has-been-hydrated Persisting store data}
 */
export const useHydration = (): boolean => {
    const [hydrated, setHydrated] = useState(false)

    useEffect(() => {
        // Manual re-hydration
        const unsubHydrate = useStore.persist.onHydrate(() =>
            setHydrated(false)
        )
        const unsubFinishHydration = useStore.persist.onFinishHydration(() =>
            setHydrated(true)
        )

        // Auto hydration
        setHydrated(useStore.persist.hasHydrated())

        return () => {
            unsubHydrate()
            unsubFinishHydration()
        }
    }, [])

    return hydrated
}
