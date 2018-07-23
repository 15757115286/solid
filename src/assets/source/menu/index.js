//这里暂定为只有3级菜单
export default function getMenuSource(){
    return [
        {
            name:'地图',
            path:'/page/admin/map',
            hasChildren:false,
            icon:'fa-bar-chart'
        },
        {
            name:'Echarts例子',
            path:'/page/admin/charts',
            hasChildren:false,
            icon:'fa-bar-chart'
        },
        {
            name:'树插件测试',
            path:'/page/admin/tree',
            hasChildren:false,
            icon:'fa-bar-chart'
        },
        {
            name:'全局树事件',
            path:'/page/admin/global-tree',
            hasChildren:false,
            icon:'fa-bar-chart'
        },
        {
            name:'父菜单1',
            hasChildren:true,
            children:[
                {
                    name:'http测试组件',
                    path:'/page/admin/http',
                    hasChildren:false
                }
            ],
            open:true,
            stopToggle:true
        },
        {
            name:'路由3',
            path:'/page/admin/component3',
            hasChildren:false,
        },
        {
            name:'父菜单2',
            hasChildren:true,
            children:[
                {
                    name:'组件2-2',
                    path:'/page/admin/component2',
                    hasChildren:false
                },
                {
                    name:'组件2-3',
                    hasChildren:true,
                    open:false,
                    children:[
                        {
                            name:'路由3-1',
                            path:'/page/admin/component1'
                        }
                    ]
                }
            ],
            open:false
        }
    ]
}

export const height = 41;//这个是菜单选项的高度，因为动态计算的这里需要预先设置
export const defaultIcon = 'fa-circle-o';//默认的图标，如果没有icon属性的菜单会调用这个
/**
 * set：Vue.$set
 * menu ：菜单资源
 * 如果你在每个父级菜单都有open属性的话，那么不需要这么辅助函数去添加动态的open
 * 但是如果你只是在展开的菜单添加open而默认收缩的菜单省略open的话，就需要借助
 * 这个辅助函数去动态的添加相应的open属性
 */
export function setObserveMenu(set,menu){
    if(!Array.isArray(menu)) return;
    for(let i=0;i<menu.length;i++){
        if(menu[i].hasChildren){
            if(menu[i].open === undefined){
                set(menu[i],'open',false)
            }
            setObserveMenu(set,menu[i].children)
        }
    }
}