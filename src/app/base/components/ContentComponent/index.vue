<template>
    <div class="content">
        <div class="path" :origin-path="$store.state.currentPath.toPath">
            当前路径：{{ $store.state.currentPath.toPath | translateMenu }} 
        </div>
        <router-view :style="{marginTop:'30px'}"></router-view>
    </div>
</template>
<script>
export default {
    name:'contentComponent'
}
</script>
<style scoped>
    .content{
        position: relative;
        margin-top: 50px;
        margin-left: 200px;
        overflow: auto;
    }
    .path{
        position: fixed;
        height: 30px;
        line-height: 30px;
        border-bottom: 1px solid gainsboro;
        background-color: white;
        z-index: 999;
        left: 200px;
        right: 0;
        overflow: hidden;
        padding-left: 10px;
    }
</style>


