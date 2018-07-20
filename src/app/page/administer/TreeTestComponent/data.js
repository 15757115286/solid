import order from '@/assets/img/order.png'
export default [
    {
        id:1,
        name:'第一层级-1',
        expand:false,
        selected:false,
        children:[
            {
                id:4,
                name:'第二层级-1',
                expand:false,
                selected:false,
                children:[
                    {
                        id:6,
                        name:'第三层级-1',
                        expand:false,
                        selected:false,
                        children:null
                    }
                ]
            },
            {
                id:5,
                name:'第二层级-2',
                expand:false,
                selected:false,
                children:null,
                checked:true
            }
        ]
    },
    {
        id:2,
        name:'第一层级-2',
        expand:false,
        selected:false,
        children:[]
    },
    {
        id:3,
        name:'第一层级-3',
        expand:false,
        selected:false,
        children:null
    }
]