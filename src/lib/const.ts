import type { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { faBus, faBusSimple, faSubway } from '@fortawesome/free-solid-svg-icons'

import type { Method, MetroLine } from '@/types/route'

type MethodLabels = { [M in Method]: { icon: IconDefinition; name: string } }

export const methodLabels: Readonly<MethodLabels> = {
    Shuttle: { icon: faBusSimple, name: '校車' },
    Bus: { icon: faBus, name: '公車' },
    Metro: { icon: faSubway, name: '捷運' }
}

type MetroStyles = { [M in MetroLine]: string }

export const metroStyles: Readonly<MetroStyles> = {
    BR: 'bg-amber-600/10 text-amber-700 dark:bg-amber-600/50 dark:text-white',
    R: 'bg-red-500/10 text-red-600 dark:bg-red-500/50 dark:text-white',
    G: 'bg-emerald-500/8 text-emerald-600 dark:bg-emerald-500/40 dark:text-white',
    O: 'bg-orange-400/10 text-orange-500 dark:bg-orange-500/40 dark:text-white',
    BL: 'bg-blue-500/10 text-blue-600 dark:bg-blue-500/50 dark:text-white',
    Y: 'bg-yellow-300/25 text-yellow-600 dark:bg-yellow-400/40 dark:text-white'
}
