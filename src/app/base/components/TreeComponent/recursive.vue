<template>
    <ul class="tree-children">
        <li v-for="child in data">
            <div class="tree-label">
                <span class="tree-font tree-direction" @click="toggle(child,$event)" 
                    v-if="child.children">
                    <i class="fa fa-caret-right" aria-hidden="true" :class="{'tree-rotate': child[option.expand]}"></i>
                </span>
                <span class="tree-font tree-title" @click="selected(child)" :class="{'tree-selected':child[option.selected]}">
                    <img src="./icon/file.png" width="14px">
                    <span>{{ child[option.value] }}</span>
                </span>
            </div>
            <recursive-component :data="child.children" :option="option" v-if="hasChildren(child)"
                :class="{'tree-hidden':!child[option.expand]}"></recursive-component>
        </li>
    </ul>
</template>
<script>
import bus from './bus'
export default {
    name:'recursiveComponent',
    props:{
        data:{
            type:Array,
            required:true
        },
        option:{
            type:Object,
            required:true
        }
    },
    data(){
        return {
            $data:this.data
        }
    },
    methods:{
        hasChildren(child){
            return child.children && child.children.length > 0;
        },
        toggle(child,event){
            child[this.option.expand] = !child[this.option.expand];
            bus.$emit('expand',child,event);
        },
        selected(child){
            bus.$emit('selected',child);
        }
    }
}
</script>
