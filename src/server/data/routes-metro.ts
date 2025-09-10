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
                transferTime: 0,
                duration: 120,
                _LineID: 'R',
                _StationID: 'R09',
                _DestinationStationIDs: ['R02', 'R05']
            },
            {
                lineName: '松山新店線',
                origin: '中正紀念堂',
                directions: ['新店'],
                destination: '公館',
                transferTime: 60,
                duration: 360,
                _LineID: 'G',
                _StationID: 'G10',
                _DestinationStationIDs: ['G01']
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
                transferTime: 0,
                duration: 240,
                _LineID: 'BL',
                _StationID: 'BL13',
                _DestinationStationIDs: ['BL01', 'BL05']
            },
            {
                lineName: '松山新店線',
                origin: '西門',
                directions: ['新店'],
                destination: '公館',
                transferTime: 60,
                duration: 540,
                _LineID: 'G',
                _StationID: 'G12',
                _DestinationStationIDs: ['G01']
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
                transferTime: 0,
                duration: 240,
                _LineID: 'BL',
                _StationID: 'BL13',
                _DestinationStationIDs: ['BL23', 'BL21']
            },
            {
                lineName: '文湖線',
                origin: '忠孝復興',
                directions: ['動物園'],
                destination: '科技大樓',
                transferTime: 300,
                duration: 180,
                _LineID: 'BR',
                _StationID: 'BR10',
                _DestinationStationIDs: ['BR01']
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
                transferTime: 0,
                duration: 360,
                _LineID: 'G',
                _StationID: 'G07',
                _DestinationStationIDs: ['G19']
            },
            {
                lineName: '淡水信義線',
                origin: '中正紀念堂',
                directions: ['淡水', '北投'],
                destination: '台大醫院',
                transferTime: 60,
                duration: 120,
                _LineID: 'R',
                _StationID: 'R08',
                _DestinationStationIDs: ['R28', 'R22']
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
                transferTime: 0,
                duration: 540,
                _LineID: 'G',
                _StationID: 'G07',
                _DestinationStationIDs: ['G19']
            },
            {
                lineName: '板南線',
                origin: '西門',
                directions: ['南港展覽館', '昆陽'],
                destination: '善導寺',
                transferTime: 60,
                duration: 240,
                _LineID: 'BL',
                _StationID: 'BL11',
                _DestinationStationIDs: ['BL23', 'BL21']
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
                transferTime: 0,
                duration: 180,
                _LineID: 'BR',
                _StationID: 'BR08',
                _DestinationStationIDs: ['BR24']
            },
            {
                lineName: '板南線',
                origin: '忠孝復興',
                directions: ['頂埔', '亞東醫院'],
                destination: '善導寺',
                transferTime: 300,
                duration: 240,
                _LineID: 'BL',
                _StationID: 'BL15',
                _DestinationStationIDs: ['BL01', 'BL05']
            }
        ]
    }
]

export default metroRoutes
