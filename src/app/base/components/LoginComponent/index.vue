<template>
    <div id="login">
        <div class="login-wrapper">
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
    </div>
</template>

<script>
import console from "app/utils/console";
export default {
  methods: {
    submit() {
      this.$store.dispatch("login", { name: "xwt" }).then(res => {
        if (res.success == 0) {
          //这里模仿登录成功
          this.$router.push("/page/admin/first");
        } else {
          console.log("登录失败！");
        }
      });
    }
  }
};
</script>
<style scoped>
#login {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  padding:110px 0;
}
.login-wrapper{
    position: relative;
    margin: 0 auto;
    width: 375px;
}
</style>


