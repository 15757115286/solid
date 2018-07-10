<template>
    <div class="content">
        <div class="path">当前路径：首页->测试页面</div>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    name:'contentComponent'
}
</script>
<style scoped>
    .content{
        position: absolute;
        left: 200px;
        right: 0;
        top: 50px;
        bottom: 0;
        background-color: brown;
    }
    .path{
        height: 30px;
        line-height: 30px;
        border-bottom: 1px solid gainsboro;
    }
</style>


