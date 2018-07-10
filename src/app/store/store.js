import Vuex from 'vuex'
import Vue from 'vue'
import * as api from './mutation-types'
//import console from '../utils/console'
Vue.use(Vuex);//使用vuex状态管理

export default new Vuex.Store({
    state: {
      count: 0,
      isLogin: false
    },
    /**
     * mutations中的函数只能是同步函数，在组件中通过this.$store.commit(type:string,option:object)触发
     * 回调函数中有2个参数，第一个state是上面声明的state，第二个参数是自己提交上来的参数（可选）
     */
    mutations: {
      increment (state) {
        state.count++
      }
    },
    /**
     *  actions的回调函数可以异步,在组件中通过this.$store.dispatch(type:string,option:object)触发
     * 回调函数中有2个参数，第一个一个对象{commit,state,getters,dispatch,rootState,rootGetters}
     * 第二个参数是自己提交上来的参数（可选）
     * 
     */
    actions:{
      [api.LOGIN]({state}){
        return new Promise(resolve=>{
          setTimeout(()=>{
            state.isLogin = true;
            resolve({
              success:0
            });
          },50);
        })
      }
    }
  })