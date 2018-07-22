<template>
    <div class="head">
        <div class="left-head">
            <img height="24px" :src="headImg"  alt="head logo">
            <a>Admin</a>
        </div>
        <div class="right-head">
             <div class="head-item user-info" @mouseenter="mouseenter()" @mouseleave="mouseleave()">
            <img :src="personImg" alt="user logo" class="user-img">
            <span class="user-text">你好，曹敏</span>
            <i class="fa fa-caret-down arrow-down" aria-hidden="true"></i>
            <ul class="menu-down" ref="menuDown" @click="click()">
                <li><i class="fa fa-user-o" aria-hidden="true"></i><span>用户信息</span></li>
                <li><i class="fa fa-cog" aria-hidden="true"></i><span>设置</span></li>
                <hr>
                <li @click="logout()"><i class="fa fa-sign-out" aria-hidden="true"></i><span>退出登录</span></li>
            </ul>
        </div>    
        <a class="head-item tree-button" @click.prevent="toggleTree()">
            <i class="fa fa-bars" aria-hidden="true"></i>
        </a>  
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
        mouseenter(){
            this.$A(this.$refs.menuDown).show(100);
        },
        mouseleave(){
            this.$A(this.$refs.menuDown).hidden(100);
        },
        click(){
            this.$A(this.$refs.menuDown).hidden(100);
        },
        logout(){
            this.$store.dispatch('logout').then(res=>{
                if(res.success == 0){
                    this.$router.push('/login');
                }
            })
        },
        toggleTree(){
            this.$store.commit('toggleTree');
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
    .left-head{
        display: flex;
        align-items:center;
        justify-content: flex-start;
        width: 200px;
        margin-left: 24px;
    }
    
    .left-head a{
        font-size: 24px;
        color: #fff;
    }
    .left-head a:hover{
        color: #009688;
    }
    .right-head{
        display: flex;
        justify-content: flex-end;
    }
    .head-item{
        height: 100%;
        padding:0 20px;
        float: right;
    }
    .head-item:hover{
        cursor: pointer;
    }
    .user-info{
        position: relative;
        display: flex;
        align-items: center;
    }

    .user-img{
        height: 32px;
        border-radius: 100%;
    }
    .user-text{
        margin-left: 10px;
    }
    .arrow-down{
        transition:transform 0.3s;
        margin-left: 10px;
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
        display: none;
    }
    .menu-down li{
        padding :8px 20px 8px 15px;
        transition : background-color .3s;
        user-select: none;
        overflow: hidden;
        white-space: nowrap;
    }
    .menu-down li i:first-child{
        margin-right: 5px;
    }
    .menu-down hr{
        margin: 5px 0;
    }
    .tree-button{
        display: flex;
        align-items: center;
    }
</style>


