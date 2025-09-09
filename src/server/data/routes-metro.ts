import type { Route } from '@/types/route'

export const metroRoutes: Route<'Metro'>[] = [
    // R09 台大醫院 -> R08/G10 中正紀念堂 -> G07 公館
    {
        id: 30,
        method: 'Metro',
        sections: [
            {
                lineName: '淡水信義線',
                origin: '台大醫院',
                directions: ['象山', '大安'],
                destination: '中正紀念堂',
                duration: 120,
            },
            {
                lineName: '松山新店線',
                origin: '中正紀念堂',
                directions: ['新店'],
                destination: '公館',
                duration: 360,
            }
        ]
    },
    // BL13 善導寺 -> BL11/G12 西門 -> G07 公館
    {
        id: 31,
        method: 'Metro',
        sections: [
            {
                lineName: '板南線',
                origin: '善導寺',
                directions: ['頂埔', '亞東醫院'],
                destination: '西門',
                duration: 240,
            },
            {
                lineName: '松山新店線',
                origin: '西門',
                directions: ['新店'],
                destination: '公館',
                duration: 540,
            }
        ]
    },
    // BL13 善導寺 -> BL15/BR10 忠孝復興 -> BR08 科技大樓
    {
        id: 32,
        method: 'Metro',
        sections: [
            {
                lineName: '板南線',
                origin: '善導寺',
                directions: ['南港展覽館', '昆陽'],
                destination: '忠孝復興',
                duration: 240,
            },
            {
                lineName: '文湖線',
                origin: '忠孝復興',
                directions: ['動物園'],
                destination: '科技大樓',
                duration: 180,
            }
        ]
    },
    // G07 公館 -> G10/R08 中正紀念堂 -> R09 台大醫院
    {
        id: 33,
        method: 'Metro',
        sections: [
            {
                lineName: '松山新店線',
                origin: '公館',
                directions: ['松山'],
                destination: '中正紀念堂',
                duration: 360,
            },
            {
                lineName: '淡水信義線',
                origin: '中正紀念堂',
                directions: ['淡水', '北投'],
                destination: '台大醫院',
                duration: 120,
            }
        ]
    },
    // G07 公館 -> G12/BL11 西門 -> BL13 善導寺
    {
        id: 34,
        method: 'Metro',
        sections: [
            {
                lineName: '松山新店線',
                origin: '公館',
                directions: ['松山'],
                destination: '西門',
                duration: 540,
            },
            {
                lineName: '板南線',
                origin: '西門',
                directions: ['南港展覽館', '昆陽'],
                destination: '善導寺',
                duration: 240,
            }
        ]
    },
    // BR08 科技大樓 -> BR10/BL15 忠孝復興 -> BL13 善導寺
    {
        id: 35,
        method: 'Metro',
        sections: [
            {
                lineName: '文湖線',
                origin: '科技大樓',
                directions: ['南港展覽館'],
                destination: '忠孝復興',
                duration: 180,
            },
            {
                lineName: '板南線',
                origin: '忠孝復興',
                directions: ['頂埔', '亞東醫院'],
                destination: '善導寺',
                duration: 240,
            }
        ]
    }
]

export default metroRoutes
