<template>
    <div class="tabview wrapper">
        <div class="tabview tab">
            <ul class="tabview-ul">
                <li class="tabview-li" 
                    v-for="componentObj in tabComponents"
                    :class="{'tabview-selected':componentObj.component == currentComponent}">
                    <a class="tabview-a" href="#" @click.prevent="tabClick(componentObj)">{{ componentObj.name }}</a>
                </li>
            </ul>
        </div>
        <div class="tabview view">
            <transition name="fade" v-if="needCache">
                <keep-alive :include="include">
                    <component :is="currentComponent"></component>
                </keep-alive>
            </transition>
            <component :is="currentComponent" v-else></component>
        </div>
    </div>
</template>
<script>
import './tabView.scss';
export default {
    created(){
        let currentComponentObj = this.tabComponents[0] || null;
        currentComponentObj && (this.currentComponent = currentComponentObj.component);
    },
    props:{
        tabComponents:{
            type:Array,
            default:[]
        },
        needCache:{
            type:Boolean,
            default:true
        }
    },
    data(){
        return {
            currentComponent:null
        }
    },
    computed:{
        include(){
            return this.tabComponents.map(componentObj=>{
                return componentObj.component.name;
            });
        },
        hasComponent(){
            return this.tabComponents.length > 0;
        }
    },
    methods:{
        tabClick(componentObj){
            this.currentComponent = componentObj.component;
        }
    }
}
</script>

