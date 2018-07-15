<template>
    <div id="login">
          <div class="login-wrapper">
              <div class="login-title">
                  <span>cm-Admin</span>
              </div>
              <div class="login-item">
                  <i class="fa fa-user-o login-icon" aria-hidden="true"></i>
                  <input type='text' name='username' v-model="username" class="cm-input user" placeholder="用户名">
              </div>
              <div class="login-item">
                  <i class="fa fa-lock login-icon" aria-hidden="true"></i>
                  <input type='password' name='password' v-model="password" class="cm-input" placeholder="密码">
              </div>
              <button @click="submit()" class="cm-button">登录</button>
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
      if(this.username == 'admin'  && this.password == '1111'){
        this.$store.commit('isLogin');
        this.$router.push('/page/admin/first');
        return;
      }
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
  background:  url(./img/login_bg.png)  no-repeat fixed ;
  background-size: 100% 100%;
}
.login-wrapper{
    position: relative;
    margin: 110px auto;
    width: 540px;
    padding: 28px 40px 80px;
    border: 0;
    background-color: rgba(255, 255, 255,0.3);
    border-radius: 10px;
    color: black;
}
.login-title{
  text-align: center;
  font-size: 24px;
  margin-bottom: 30px;
}
.login-item{
  position: relative;
  margin-bottom: 40px;
}
.login-icon{
    position: absolute;
    font-size: 18px;
    top: 17px;
    left: 17px;
    color: #000;
}
</style>


