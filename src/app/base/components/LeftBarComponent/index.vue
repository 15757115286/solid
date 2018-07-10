<template>
    <div class="left-bar">
        <span>这个是框架左侧菜单</span>
    </div>
</template>
<script>
export default {
    name:'leftBarComponent'
}
</script>
<style scoped>
    .left-bar{
        position: fixed;
        left: 0px;
        width: 200px;
        top: 50px;
        bottom: 0px;
        background-color: gray;
    }
</style>


