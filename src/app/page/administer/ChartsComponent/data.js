export default function(){
    return {
        tooltip : {
            trigger: 'axis'
        },
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'Num',
                type:'line',
                areaStyle: {normal: {}},
                data: [52, 54, 60, 61, 65, 62, 80, 85, 90, 99, 40, 30, 20, 10, 0]
            }
        ]
    }; 
}