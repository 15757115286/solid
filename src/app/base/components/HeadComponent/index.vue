<template>
    <div class="head">
        <span>这个是框架头部</span>
    </div>
</template>
<script>
export default {
    name:'headComponent'
}
</script>
<style scoped>
    .head{
        background-color: blueviolet;
        position: fixed;
        height: 50px;
        left: 0;
        right: 0;
        z-index: 1000;
    }
</style>


