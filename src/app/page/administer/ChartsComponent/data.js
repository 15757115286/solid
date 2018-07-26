export default function () {
    return {
        tooltip: {
            trigger: 'axis'
        },
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
        }],
        yAxis: [{
            type: 'value'
        }],
        series: [{
            name: 'Num',
            type: 'line',
            areaStyle: {
                normal: {}
            },
            data: [52, 54, 60, 61, 65, 62, 80, 85, 90, 99, 40, 30, 20, 10, 0]
        }]
    };
}

export function getLineOption() {
    return {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line'
        }]
    }
}

export function getGuageOption() {
    return {
        tooltip: {
            formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {
            feature: {
                restore: {},
                saveAsImage: {}
            }
        },
        series: [{
            name: '业务指标',
            type: 'gauge',
            detail: {
                formatter: '{value}%'
            },
            data: [{
                value: 50,
                name: '完成率'
            }]
        }]
    }
}