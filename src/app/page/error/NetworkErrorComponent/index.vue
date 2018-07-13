<template>
    <div class="error-page">
        <span>这个是错误页面哦！</span>
        <div class="error-info">
            <p>网络请求发生错误（可能是ip或者端口发生错误）</p>
        </div>
        <button @click="goBack()">返回上一层</button>
    </div>
</template>
<script>
export default {
    methods:{
        goBack(){
            this.$router.go(-1)
        }
    }
}
</script>
<style scoped>

</style>


