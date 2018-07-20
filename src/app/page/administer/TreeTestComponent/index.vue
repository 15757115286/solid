<template>
    <div>
        <h4>test</h4>
        <!-- <img src="~@/assets/img/person.png"> -->
        <tree-component ref="tree" :data="data" :option="option" 
            @selected="selected($event)" @expand="expand($event)" 
            @check="check($event)"
            style="width:200px;height:500px;"></tree-component>
    </div>
</template>
<script>
import TreeComponent from 'app/base/components/TreeComponent'
import data from './data'
import refersh from '@/assets/img/refresh.png'
export default {
    name:'treeTestComponent',
    data(){
        return {
            data:data,
            option:{
                key:'id',
                value:'name',
                showIcon:true,
                showCheckBox:true,
                needAnimation:false,
                needChangeIcon:false,
                transImgPath(child){
                    //if(child.id == 6) return refersh;
                },
                changeImgPath(child){
                    if(child.expand == true){
                        return require('../../../base/components/TreeComponent/icon/dir_open.png');
                    }else{
                        return require('../../../base/components/TreeComponent/icon/dir_close.png');
                    }
                }
            }
        }
    },
    components:{
        TreeComponent
    },
    methods:{
        selected(event){
            console.log('selected',event);
            console.log(this.$refs.tree);
        },
        expand(event){
            console.log('expand',event);
        },
        check(event){
            let checks = this.$refs.tree.getCheckedNodes();
            console.log('check',checks);
        }
    }
}
</script>

