<template>
    <div class="head">
        <div class="right-head">
            <img height="24px" :src="headImg"  alt="head logo">
            <a>Admin</a>
        </div>
        <div class="user-info" @mouseenter="enter()" @mouseleave="leave()">
            <div class="user-img">
                <img :src="personImg" alt="user logo">
            </div>
            <span class="user-text">你好，曹敏</span>
            <i class="fa fa-caret-down arrow-down" aria-hidden="true"></i>
            <ul class="menu-down" ref="menuDown" :style="{display : show ? 'block' : 'none'}"
            @click="show = false">
                <li><i class="fa fa-user-o" aria-hidden="true"></i><span>用户信息</span></li>
                <li><i class="fa fa-cog" aria-hidden="true"></i><span>设置</span></li>
                <hr>
                <li @click="logout()"><i class="fa fa-sign-out" aria-hidden="true"></i><span>退出登录</span></li>
            </ul>
        </div>       
        <!-- <button @click="changeLocal('zh')">路径（中文）</button>
        <button @click="changeLocal('en')">路径（英文）</button> -->
    </div>
</template>
<script>
import headImg from '@/assets/img/cmlogo.png'
import personImg from '@/assets/img/person.png'
export default {
    name:'headComponent',
    data(){
        return {
            headImg,
            personImg,
            show:false
        }
    },
    methods:{
        changeLocal(language){
            this.$store.commit('changeLan',language);
        },
        enter(){
            this.show = true;
        },
        leave(){
            this.show = false;
        },
        logout(){
            this.$store.dispatch('logout').then(res=>{
                if(res.success == 0){
                    this.$router.push('/login');
                }
            })
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
        display: flex;
        justify-content: space-between;
    }
    .right-head{
        display: flex;
        align-items:center;
        justify-content: flex-start;
        width: 200px;
        margin-left: 24px;
    }
    
    .right-head a{
        font-size: 24px;
        color: #fff;
    }
    .right-head a:hover{
        color: #009688;
    }
    .user-info{
        position: relative;
        height: 100%;
        float: right;
        display: flex;
        align-items: center;
        padding:0 20px;
    }
    .user-img{
        display: inline-block;
        border-radius: 32px;
        overflow: hidden;
    }
    .user-img,.user-img img{
         height: 32px;
         width: 32px;
    }
    .user-text{
        margin-left: 5px;
    }
    .arrow-down{
        transition:transform 0.3s;
        margin-left: 10px;
    }
    .user-info:hover{
        cursor: pointer;
    }
    .user-info:hover .arrow-down{
        transform: rotate(180deg);
    }
    .user-text{
        user-select: none;
    }
    .menu-down{
        position: absolute;
        top: 50px;
        left: 0px;
        color: #333;
        border-radius: 5px;
        padding: 5px 0;
    }
    .menu-down li{
        padding :8px 20px 8px 15px;
        transition : background-color .3s;
        user-select: none;
    }
    .menu-down li i:first-child{
        margin-right: 5px;
    }
    .menu-down hr{
        margin: 5px 0;
    }
</style>


