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
            selected:null,
            expand:null,
            selected:null
        }
    },
    components:{
        RecursiveComponent
    },
    created(){
        this.selected = function(child){
            if(this.selected){
                this.selected.selected = false;
            }
            this.selected = child;
            child.selected = true;
            this.$emit('selected',child);
        }.bind(this);
        this.expand = function(child,event){
            let target = event.target;
            let targetName = target.tagName.toLowerCase();
            let ul = targetName == 'i' ? target.parentElement.parentElement.nextElementSibling : 
                target.parentElement.nextElementSibling;
            let animation = ul ? this.$A(ul) : null;
            if(child.expand){
                animation && animation.show(150);
            }else{
                animation && animation.hidden(150);
            }
            this.$emit('expand',child);
        }.bind(this);
        Object.assign(this.mergeOption,defaultOption,this.option);
        bus.$on('selected',this.selected);
        bus.$on('expand',this.expand);
    },
    destroyed(){
        bus.$off('selected',this.selected);
        bus.$off('expand',this.expand);
    }
}
</script>

