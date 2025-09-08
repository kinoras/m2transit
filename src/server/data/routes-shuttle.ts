import type { Route } from '@/types/route'

export const shuttleRoutes: Route<'Shuttle'>[] = [
    // 城中行政大樓 -> 傅鐘(校總區)
    {
        id: 10,
        method: 'Shuttle',
        sections: [
            {
                origin: '城中行政大樓',
                destination: '傅鐘(校總區)',
                duration: 1500 // 25 min
            }
        ]
    },
    // 仁愛林森路口 -> 傅鐘(校總區)
    {
        id: 11,
        method: 'Shuttle',
        sections: [
            {
                origin: '仁愛林森路口',
                destination: '傅鐘(校總區)',
                duration: 1380 // 23 min
            }
        ]
    },
    // 傅鐘(校總區) -> 城中行政大樓
    {
        id: 12,
        method: 'Shuttle',
        sections: [
            {
                origin: '傅鐘(校總區)',
                destination: '城中行政大樓',
                duration: 1200 // 20 min
            }
        ]
    },
    // 傅鐘(校總區) -> 仁愛林森路口
    {
        id: 13,
        method: 'Shuttle',
        sections: [
            {
                origin: '傅鐘(校總區)',
                destination: '仁愛林森路口',
                duration: 1380 // 23 min
            }
        ]
    }
]

export default shuttleRoutes
