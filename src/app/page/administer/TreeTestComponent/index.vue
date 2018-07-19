<template>
    <div>
        <h4>test</h4>
        <!-- <img src="~@/assets/img/person.png"> -->
        <tree-component :data="data" :option="option" @selected="selected($event)" @expand="expand($event)" style="width:200px;height:500px;"></tree-component>
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
                transImgPath(child,mergeOption){
                    if(child.id == 6) return refersh;
                },
                changeImgPath(child,mergeOption){
                    if(child.expand == false){
                        import('../../../base/components/TreeComponent/icon/dir.png').then(res=>{
                            child[mergeOption.imgPath] =  res.default;
                        });
                    }else{
                        child[mergeOption.imgPath] = import('../../../base/components/TreeComponent/icon/dir_close.png').then(res=>{
                            child[mergeOption.imgPath] =  res.default;
                        });
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
        },
        expand(event){
            console.log('expand',event);
        }
    }
}
</script>

