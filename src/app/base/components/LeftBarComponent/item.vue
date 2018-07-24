<template>
     <ul :class="[classNum + '-menu-ul',!data.open && 'hidden']" ref="menu-ul">
        <li v-for="menu in items" :class="classNum + '-menu-li'">
            <a v-if=" menu.hasChildren " @click.prevent="toggle(menu,$event)" 
            class="can-expend" :class="{open:menu.open ,'stop-toggle':menu.stopToggle}">
                <i class="fa" :class = "menu.icon || defaultIcon" aria-hidden="true"></i>
                <span class="menu-name">{{ menu.name }}</span>
                <i class="fa fa-angle-right pull-right" aria-hidden="true"></i>
            </a>
            <router-link v-else :to="menu.path">
                <i class="fa" :class = "menu.icon || defaultIcon" aria-hidden="true"></i>
                <span class="menu-name">{{ menu.name }}</span>
            </router-link>
            <items-component v-if="menu.hasChildren" :data="menu" :level="level + 1"></items-component>
        </li>
    </ul>
</template>
<script>
export default {
    name:'itemsComponent',
    props:{
        data:{
            type:Object,
            required:true
        },
        level:{
            type:Number,
            required:true
        }
    },
    data(){
        return {
            items:this.data.children,
            classNum:'',
            open:this.menuOpen
        }
    },
    created(){
        this.classNum = this.transNumToEn(this.level);
    },
    inject:['toggle','getMenuHeight','transNumToEn','defaultIcon']
}
</script>
<style scoped>
    .hidden{
        display: none;
    }
</style>


