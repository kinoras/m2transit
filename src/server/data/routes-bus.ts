import type { Route } from '@/types/route'

export const busRoutes: Route<'Bus'>[] = [
    // 208 新店 - 仁愛林森路口 -> 捷運公館站
    {
        id: 20,
        method: 'Bus',
        sections: [
            {
                origin: '仁愛林森路口',
                routeName: '208',
                direction: '新店',
                destination: '捷運公館站',
                duration: 1200
            }
        ]
    },
    // 671 景美女中 - 仁愛林森路口 -> 捷運公館站
    {
        id: 21,
        method: 'Bus',
        sections: [
            {
                origin: '仁愛林森路口',
                routeName: '671',
                direction: '景美女中',
                destination: '捷運公館站',
                duration: 1800
            }
        ]
    },
    // 和平 萬芳社區 - 仁愛林森路口 -> 復興南路口
    {
        id: 22,
        method: 'Bus',
        sections: [
            {
                origin: '仁愛林森路口',
                routeName: '和平幹線',
                direction: '萬芳社區',
                destination: '復興南路口',
                duration: 1200
            }
        ]
    },
    // 295 富德 - 仁愛林森路口 -> 台大國青大樓
    {
        id: 23,
        method: 'Bus',
        sections: [
            {
                origin: '仁愛林森路口',
                routeName: '295',
                direction: '富德',
                destination: '台大國青大樓',
                duration: 1500
            }
        ]
    },
    // 295副 富德 - 仁愛林森路口 -> 基隆長興街口
    {
        id: 24,
        method: 'Bus',
        sections: [
            {
                origin: '仁愛林森路口',
                routeName: '295副',
                direction: '富德',
                destination: '基隆長興街口',
                duration: 1680
            }
        ]
    },
    // 208 大直 - 捷運公館站 -> 開南中學
    {
        id: 25,
        method: 'Bus',
        sections: [
            {
                origin: '捷運公館站',
                routeName: '208',
                direction: '大直',
                destination: '開南中學',
                duration: 1200
            }
        ]
    },
    // 和平 台北車站 - 復興南路口 -> 台大醫院
    {
        id: 26,
        method: 'Bus',
        sections: [
            {
                origin: '復興南路口',
                routeName: '和平幹線',
                direction: '台北車站',
                destination: '台大醫院',
                duration: 1200
            }
        ]
    }
]

export default busRoutes
