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
            <input type="checkbox" v-model="needIntercept">是否开启过滤
            <button @click="test01()">get測試01</button>
            <button @click="test02()">post測試01</button>
            <button @click="test03()">get測試</button>
            <button @click="test04()">post测试04</button>
            <br>
            <input type="checkbox" v-model="needError">是否加入错误url
            <button @click="testAll()">post测试All</button>
        </div>
    </div>
</template>
<script>
export default {
  name: "httpComponent",
  data() {
    return {
      username: "sensoradmin",
      password: "1111",
      url: "service/commserver/AuthService/loginIn",
      needIntercept: true,
      needError:false
    };
  },
  methods: {
    test01(){
      this.$http
        .get(
          this.url,
          this.needIntercept
        )
        .do(res => {
          console.log(res);
        })
        .error(rej => {
          console.log("error", rej);
        });
    },
    test02(){
      this.$http
        .post(
          this.url,
          this.needIntercept
        )
        .do(res => {
          console.log(res);
        })
        .error(rej => {
          console.log("error", rej);
        });
    },
    test03() {
      this.$http
        .get(
          this.url,
          {
            accountid: this.username,
            password: this.password
          },
          this.needIntercept
        )
        .do(res => {
          console.log(res);
        })
        .error(rej => {
          console.log("error", rej);
        });
    },
    test04() {
      let promise = this.$http
        .post(
          this.url,
          {
            accountid: this.username,
            password: this.password
          },
          this.needIntercept
        )
        .do(res => {
          console.log(res);
        })
        .error(rej => {
          console.log("error", rej);
        });
    },
    testAll() {
      let errorUrl = this.url + '/error';
      this.$http
        .all([
          this.$http.get(
            this.url,
            {
              accountid: this.username,
              password: this.password
            },
            this.needIntercept
          ),
          this.$http.get(
            this.url,
            {
              accountid: this.username,
              password: this.password
            },
            this.needIntercept
          ),
          this.$http.get(
            this.needError ? errorUrl : this.url,
            {
              accountid: this.username,
              password: this.password
            },
            this.needIntercept
          )
        ])
        .do(res => {
          console.log(res);
        })
        .error(rej => {
          console.log(rej);
        });
    }
  }
};
</script>
