<template>
    <div class="right-bar" :class="$store.state.showTree && 'show-bar'">
        <tree-component :data="data" :option="option" class="right-tree" ref="tree"
            @selected="selected($event)" @check="check($event)" @expand="expand($event)"
            placeholder="节点名称">
        </tree-component>
    </div>
</template>
<script>
import TreeComponent from 'app/base/components/TreeComponent'
import getData from 'app/page/administer/TreeTestComponent/data'
import globalBus from 'app/utils/bus'
let num = 1000;
export default {
    name:'rightBarComponent',
    components:{
        TreeComponent
    },
    mounted(){
        globalBus.add('gbTree',this.tree = this.$refs.tree);
    },
    destroyed(){
        this.globalBus.del('gbTree');
    },
    data(){
        return {
            tree:null,
            globalBus:globalBus,
            data:getData(),
            option:{
                showIcon:true,
                needAnimation:true,
                isAsync:true,
                showCheckBox:false,
                needSearch:true,
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
    },
    methods:{
        selected(selectNode){
            selectNode
            this.globalBus.notify('gb.selected',selectNode);
        },
        check(checkNode){
            this.globalBus.notify('gb.check',checkNode);
        },
        expand(expandNode){
            this.globalBus.notify('gb.expand',expandNode);
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

