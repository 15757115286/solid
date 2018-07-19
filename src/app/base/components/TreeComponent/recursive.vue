<template>
    <ul class="tree-children">
        <li v-for="child in data">
            <div class="tree-label">
                <span class="tree-font tree-direction" @click="toggle(child,$event)" 
                    v-if="child[option.children]">
                    <i class="fa fa-caret-right" aria-hidden="true" :class="{'tree-rotate': child[option.expand]}"></i>
                </span>
                <span class="tree-font tree-title" @click="selected(child)" :class="{'tree-selected':child[option.selected]}">
                    <img :src="child[option.imgPath]" width="14px" v-if="option.showIcon">
                    <span>{{ child[option.value] }}</span>
                </span>
            </div>
            <recursive-component :data="child[option.children]" :option="option" :parent="child" v-if="hasChildren(child)"
                :class="{'tree-hidden':!child[option.expand]}"></recursive-component>
        </li>
    </ul>
</template>
<script>
import bus from './bus'
import file from './icon/file.png'
import dir from './icon/dir.png'
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
        },
        parent:{
            type:Object,
            default:null
        }
    },
    data(){
        return {
            copyOfData:this.data,
            copyOfParent:this.parent
        }
    },
    created(){
        this.copyOfData.forEach(elem=>{
            if(!elem[this.option.parent]){
                this.$set(elem,this.option.parent,this.copyOfParent);
            }
            if(!elem[this.option.imgPath]){
                this.$set(elem,this.option.imgPath,this.findPath(elem));
            }
        })
    },
    methods:{
        hasChildren(child){
            return child[this.option.children] && child[this.option.children].length > 0;
        },
        toggle(child,event){
            child[this.option.expand] = !child[this.option.expand];
            let changeImgPath = this.option.changeImgPath;
            if(typeof changeImgPath == 'function'){
                changeImgPath(child,this.option);
            }
            bus.$emit('expand',child,event);
        },
        selected(child){
            bus.$emit('selected',child);
        },
        findPath(child){
            if(child[this.option.imgPath]){
                return child[this.option.imgPath];
            }
            let transImgPath = this.option.transImgPath;
            let path = transImgPath(child);
            if(path) return path;
            if(child[this.option.children]){
                return dir;
            }
            return file;
        }   
    }
}
</script>
