import 'babel-polyfill'
import 'iview/dist/styles/iview.css'
import '@/assets/css/theme/theme.scss'
import 'font-awesome/css/font-awesome.css'
import 'app/base/filters'
import 'app/base/http'
import Vue from 'vue'
import VueRouter from 'vue-router'
import iView from 'iview'
import App from './app.vue'
import router from './router'
import store from './app/store'


Vue.use(VueRouter);//使用路由
Vue.use(iView);//使用iView UI
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
