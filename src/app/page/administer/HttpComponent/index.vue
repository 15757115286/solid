<template>
    <div class="http-test">
        <div class="expample one">
            <div>
                <label>URL：</label>
                <input type="text" v-model="url" style="width:400px;">
            </div>
            <div>
                <label>用户名：</label>
                <input type="text" v-model="username">
            </div>
            <div>
                <label>密码：</label>
                <input type="password" v-model="password">
            </div>
            <p>http请求测试：配置config</p>
            <button @click="test03()">get測試</button>
            <br>
            <input type="checkbox" v-model="needIntercept">是否开启过滤
            <button @click="test04()">post测试04</button>
        </div>
    </div>
</template>
<script>
import http from 'app/base/http'
export default {
  name: "httpComponent",
  data() {
    return {
      username: "sensoradmin",
      password: "1111",
      url: "service/commserver/AuthService/loginIn",
      needIntercept:true
    };
  },
  methods: {
    test03(){
        http.get(this.url,{
            accountid: this.username,
            password: this.password
        },{timeout:10},this.needIntercept).do(res=>{
            console.log(res);
        })
    },
    test04(){
        http.post(this.url,{
          accountid: this.username,
          password: this.password
        },this.needIntercept).do(res=>{
            console.log(res);
        })
    },
  }
};
</script>
