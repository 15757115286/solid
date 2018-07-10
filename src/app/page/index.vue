<template>
    <div class="wrapper">
        <head-component></head-component>
        <left-bar-component></left-bar-component>
        <content-component></content-component>
    </div>
</template>
<script>
import ContentComponent from 'app/base/components/ContentComponent'
import HeadComponent from 'app/base/components/HeadComponent'
import LeftBarComponent from 'app/base/components/LeftBarComponent'
export default {
    name:'pageComponent',
    components:{
        ContentComponent,
        HeadComponent,
        LeftBarComponent
    }
}
</script>
<style scoped>
.wrapper{
    overflow: auto;
}
</style>


