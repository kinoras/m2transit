import { ArrivalObject } from '@/types/arrival'
import type { Direction, DirectionId } from '@/types/direction'
import type { Method } from '@/types/route'

export type PersistedItem<T> = {
    data: T
    expiry: number
}

export type State = {
    // Persisted
    directions?: PersistedItem<Direction[]>
    setDirections: (directions: Direction[], expiry: number) => void

    // Volatile
    selectedDirectionId?: DirectionId
    setSelectedDirectionId: (selectedDirectionId?: DirectionId) => void
    activeMethod: Method
    setActiveMethod: (activeMethod?: Method) => void
    arrivalData: ArrivalObject[]
    setArrivalData: (arrivalData?: ArrivalObject[]) => void
}
