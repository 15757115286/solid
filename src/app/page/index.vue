<template>
    <div class="wrapper">
        <head-component></head-component>
        <left-bar-component></left-bar-component>
        <content-component></content-component>
        <right-bar-component></right-bar-component>
    </div>
</template>
<script>
import useEcharts from 'app/base/directives/v-echarts'
import ContentComponent from 'app/base/components/ContentComponent'
import HeadComponent from 'app/base/components/HeadComponent'
import LeftBarComponent from 'app/base/components/LeftBarComponent'
import RightBarComponent from 'app/base/components/RightBarComponent'
useEcharts();
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


