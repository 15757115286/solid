<template>
    <div>
        <h4>test</h4>
        <tree-component :data="data" :option="option" @selected="selected($event)" @expand="expand($event)"></tree-component>
    </div>
</template>
<script>
import TreeComponent from 'app/base/components/TreeComponent'
import data from './data'
export default {
    name:'treeTestComponent',
    data(){
        return {
            data:data,
            option:{
                key:'id',
                value:'name'
            }
        }
    },
    components:{
        TreeComponent
    },
    methods:{
        selected(event){
            //console.log('selected',event);
        },
        expand(event){
            //console.log('expand',event);
        }
    }
}
</script>

