<template>
    <div id="login">
          <div class="login-wrapper">
              <div>
                  <label>用户名：</label>
                  <input type='text' name='username' v-model="username">
              </div>
              <div>
                  <label>密码：</label>
                  <input type='password' name='password' v-model="password">
              </div>
              <button @click="submit()">登录</button>
          </div>
      </div>
</template>

<script>
import console from "app/utils/console";
import { isSuccess } from 'app/utils/common'
export default {
  data(){
    return {
      username:'',
      password:''
    }
  },
  methods: {
    submit() {
      console.log(this.$http);
      this.$store.dispatch("login", {
        username: this.username,
        password: this.password
      }).then(res => {
        if(isSuccess(res)){
          localStorage.setItem('token',res.data.HTTP_ACCESS_TOKEN);
          this.$router.push('/page/admin/first');
        }
      });
    }
  }
};
</script>
<style scoped>
#login {
  position: fixed;
  top:0;
  left:0;
  bottom:0;
  right:0;
  overflow:auto;
  padding:110px 0;
  background:  url(./img/login_bg.png)  no-repeat fixed ;
  background-size: 100% 100%;
}
.login-wrapper{
    position: relative;
    margin: 0 auto;
    width: 375px;
    height: 500px;
    padding: 20px 15px;
    border: 1px solid gray;
    background: rgba(255, 255, 255,0.2);
    border-radius: 10px;
}
</style>


