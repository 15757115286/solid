import VueRouter from 'vue-router'
import store from 'app/store'
import pageRouter from 'app/page/router'
import { isLogin } from 'app/utils/common'
import LoginComponent from 'app/base/components/LoginComponent'


const PageComponent = () => import(/* webpackChunkName: 'page' */'app/page');


const router = new VueRouter({
    routes:[
     { path: '/login', component: LoginComponent },
     { path: '/page', component:PageComponent  ,children:pageRouter}
    ]
 });
 router.beforeEach((to,from,next)=>{
    if(to.matched.length == 0){
        return void next({path:'/page/error/404',replace:true});
    }
    if(to.path == '/login'){
        next();   
    }else{//判断用户是否登录
        if(isLogin()){
            next()
        }else{
            next('/login')
        }
    }
 });
 router.afterEach((to,from)=>{
    store.commit('changePath',{
        toPath:to.fullPath,
        fromPath:from.fullPath
    })
 })
export default router;