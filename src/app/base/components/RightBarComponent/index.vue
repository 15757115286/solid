<template>
    <div class="right-bar" :class="$store.state.showTree && 'show-bar'">
        <tree-component :data="data" :option="option" class="right-tree"></tree-component>
    </div>
</template>
<script>
import TreeComponent from 'app/base/components/TreeComponent'
import getData from 'app/page/administer/TreeTestComponent/data'
let num = 1;
export default {
    name:'rightBarComponent',
    components:{
        TreeComponent
    },
    data(){
        return {
            data:getData(),
            option:{
                showIcon:true,
                needAnimation:false,
                isAsync:true,
                showCheckBox:false,
                loadData(child, callback) {
                    setTimeout(() => {
                        callback([
                        {
                            id: num++,
                            name: "异步加载节点1",
                            expand: false,
                            selected: false
                        },
                        {
                            id: num++,
                            name: "异步加载节点2",
                            expand: false,
                            selected: false
                        }
                        ]);
                    }, 300);
                }
            }
        }
    }
}
</script>
<style scoped>
    .right-bar{
        position: fixed;
        top: 80px;
        bottom: 0;
        width: 200px;
        right: -200px;
        background-color: #fff;
        transition: all 0.3s;
        border:1px solid #eee;
        padding-left:9px; 
        padding-top: 10px;
        padding-right: 10px;
    }
    .show-bar{
        right: 0px;
    }
    .right-tree{
        height: 100%;
    }
</style>

