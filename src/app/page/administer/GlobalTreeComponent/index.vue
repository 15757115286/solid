<template>
    <div class="global-tree">
        <div>
            <Row class="row">
                <Col span="12" class="col">
                    <h3>节点测试</h3>
                </Col>
            </Row>
            <Row class="row">
                <Col span="12" class="col">
                    <Input v-model="addNodeName">
                        <span slot="prepend">节点名称</span>
                    </Input>
                </Col>
                <Col span="2" class="col">
                    <Button type="primary" @click="add()">新增</Button>
                </Col>
                <Col span="2" class="col">
                    <Button type="primary" @click="del()">删除选中节点</Button>
                </Col>
            </Row>
        </div>
    </div>
</template>
<script>
import globalBus from 'app/utils/bus'
let id = 1000;
export default {
    name:'globalTreeComponent',
    data(){
        return {
            globalBus:globalBus,
            selectedEvent:null,
            checkEvent:null,
            expandEvent:null,
            addNodeName:'',
            selectNode:null,
            tree:null
        }
    },
    methods:{
        add(){
            if(!this.selectNode) return;
            let addNode = {
                id:id++,
                name:this.addNodeName || '无名节点'+id,
                noData:true
            }
            this.tree.addNodes(this.selectNode,addNode);
        },
        del(){
            if(!this.selectNode) return;
            this.tree.deleteNodes(this.selectNode);
        }
    },
    created(){
        this.selectedEvent = this.globalBus.subscribe('gb.selected',(node,tree) => {
            console.log('selected');
            console.dir(node);
            this.selectNode = node;
        })
        this.checkEvent = this.globalBus.subscribe('gb.check',(node,tree) => {
            console.log('check',node);
        })
        this.expandEvent = this.globalBus.subscribe('gb.expand',(node,tree) => {
            console.log('expand',node);
        })
        this.tree = this.globalBus.get('gbTree');
    },
    destroyed(){
        //取消事件的订阅，释放内存
        this.selectedEvent();
        this.checkEvent();
        this.expandEvent();
    }
}
</script>
<style scoped>
.row{
    padding: 10px;
}
.col{
    padding-right:10px; 
}
</style>


