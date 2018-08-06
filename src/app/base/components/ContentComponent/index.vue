<template>
    <div class="content" :class="$store.state.showTree && 'showTree'">
        <div class="path" :origin-path="$store.state.currentPath.toPath">
            当前路径：{{ $store.state.currentPath.toPath | translateMenu }} 
        </div>
        <router-view class="path-content"></router-view>
    </div>
</template>
<script>
export default {
    name:'contentComponent',
    created(){
    }
}
</script>
<style scoped>
    .content{
        position: relative;
        margin-top: 50px;
        margin-left: 200px;
        overflow: auto;
        transition: all 0.3s;
        padding-top: 30px;
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
        top:50px;
    }
    .showTree{
        padding-right: 200px;
    }
</style>


