<template>
    <div id="login">
        <div>
            <label>用户名：</label>
            <input type='text' name='username'>
        </div>
        <div>
            <label>密码：</label>
            <input type='text' name='password'>
        </div>
        <button @click="submit()">登录</button>
    </div>
</template>

<script>
import console from '../../../utils/console'
import { isLogin } from '../../../utils/common'
export default {
    methods:{
        submit(){
            /* console.log(this.$store.state.count);
            this.$store.commit('increment');
             console.log(this.$store.state.count); */
             this.$store.dispatch('login',{name:'xwt'},{},{}).then(res=>{
                 console.log(res);
                 console.log(isLogin())
             })
        }
    }
}
</script>
<style scoped>

</style>


