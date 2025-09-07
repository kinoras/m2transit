import dayjs from 'dayjs'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { PersistedItem, State } from './type'

export const makePersistedItem = <T>(
    data: T,
    expiry?: number
): PersistedItem<T> => ({
    data,
    expiry: expiry ?? dayjs().unix() + 3600 // Cache for an hour by default
})

export const useStore = create<State>()(
    persist(
        (set) => ({
            // Persisted
            directions: undefined,
            setDirections: (directions, expiry) =>
                set((state) => ({
                    ...state,
                    directions: makePersistedItem(directions, expiry)
                })),

            // Volatile
            selectedDirectionId: undefined,
            setSelectedDirectionId: (selectedDirectionId) =>
                set((state) => ({ ...state, selectedDirectionId }))
        }),
        {
            name: 'storage',
            partialize: (state) => ({
                directions: state.directions
            })
        }
    )
)
