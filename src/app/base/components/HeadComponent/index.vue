<template>
    <div class="head">
        <img height="50px" :src="headImg"  alt="head logo">
        <div class="user-info">
            <div class="user-img">
                <img :src="personImg" alt="user logo">
            </div>
            <span class="user-text">你好，曹敏</span>
        </div>
        
        <!-- <button @click="changeLocal('zh')">路径（中文）</button>
        <button @click="changeLocal('en')">路径（英文）</button> -->
    </div>
</template>
<script>
import headImg from '@/assets/img/head_logo.png'
import personImg from '@/assets/img/person.png'
export default {
    name:'headComponent',
    data(){
        return {
            headImg,
            personImg
        }
    },
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
    .user-info{
        height: 100%;
        float: right;
        margin-right: 15px;
        display: flex;
        align-items: center;
        padding-right: 20px;
    }
    .user-img{
        display: inline-block;
        border-radius: 32px;
        overflow: hidden;
        cursor: pointer;
    }
    .user-img,.user-img img{
         height: 32px;
         width: 32px;
    }
    .user-text{
        margin-left: 5px;
    }
</style>


