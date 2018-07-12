<template>
    <div class="head">
        <span>这个是框架头部</span>
        <button @click="changeLocal('zh')">路径（中文）</button>
        <button @click="changeLocal('en')">路径（英文）</button>
    </div>
</template>
<script>
export default {
    name:'headComponent',
    methods:{
        changeLocal(language){
            this.$store.commit('changeLan',language);
        }
    }
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


