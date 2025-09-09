import type { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { faBus, faBusSimple, faSubway } from '@fortawesome/free-solid-svg-icons'

import type { Method } from '@/types/route'

type MethodLabels = { [M in Method]: { icon: IconDefinition; name: string } }

export const methodLabels: Readonly<MethodLabels> = {
    Shuttle: { icon: faBusSimple, name: '校車' },
    Bus: { icon: faBus, name: '公車' },
    Metro: { icon: faSubway, name: '捷運' }
}
