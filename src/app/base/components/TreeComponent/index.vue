<template>
    <div class="tree-root">
        <recursive-component :data="data" :option="mergeOption"></recursive-component>
    </div>
</template>
<script>
import defaultOption from './defaultOption'
import RecursiveComponent from './recursive'
import bus from './bus'
import './tree.scss'
export default {
    name:'treeComponent',
    props:{
        data:{
            type:Array,
            required:true
        },
        option:{
            type:Object,
            default:{}
        }
    },
    data(){
        return {
            mergeOption:{},
            selected:null
        }
    },
    components:{
        RecursiveComponent
    },
    created(){
        Object.assign(this.mergeOption,defaultOption,this.option);
        bus.$on('selected',function(child){
            if(this.selected){
                this.selected.selected = false;
            }
            this.selected = child;
            child.selected = true;
            this.$emit('selected',child);
        }.bind(this));
        bus.$on('expand',function(child,event){
            console.log(child.expand);
            let target = event.target;
            let targetName = target.tagName.toLowerCase();
            let ul = targetName == 'i' ? target.parentElement.parentElement.nextElementSibling : 
                target.parentElement.nextElementSibling;
            let animation = ul ? this.$A(ul) : null;
            if(child.expand){
                animation && animation.show(150)
            }else{
                animation && animation.hidden(150)
            }
            this.$emit('expand',child);
        }.bind(this))
    }
}
</script>

