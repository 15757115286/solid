<template>
    <div class="wrapper">
        <head-component></head-component>
        <left-bar-component></left-bar-component>
        <content-component></content-component>
        <right-bar-component></right-bar-component>
    </div>
</template>
<script>

import 'iview/dist/styles/iview.css'

import Vue from 'vue'
import iView from 'iview'
import ContentComponent from 'app/base/components/ContentComponent'
import HeadComponent from 'app/base/components/HeadComponent'
import LeftBarComponent from 'app/base/components/LeftBarComponent'
import RightBarComponent from 'app/base/components/RightBarComponent'

Vue.use(iView);//使用iView UI
export default {
    name:'pageComponent',
    components:{
        ContentComponent,
        HeadComponent,
        LeftBarComponent,
        RightBarComponent
    }
}
</script>
<style scoped>
.wrapper{
    overflow: auto;
}
</style>


