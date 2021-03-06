// css引入
import '@/assets/css/theme/theme.scss'
import 'font-awesome/css/font-awesome.css'

// polyfill引入，这里之引入了es6常用的promise，object，array，reflect
import 'app/utils/polyfill'

// 插件引入
import 'app/base/filters'
import 'app/base/directives'
import 'app/base/http'
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app.vue'
import router from './router'
import store from './app/store'
import HttpPlugin from 'app/base/http/plugin'
import AnimationPlugin from 'app/base/animation/plugin'

Vue.use(VueRouter);//使用路由
Vue.use(HttpPlugin, {needNative:true});//http插件
Vue.use(AnimationPlugin);//动画插件,默认fps为60,可通过{fps:36}来改变默认fps
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
