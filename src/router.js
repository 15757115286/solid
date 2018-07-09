import VueRouter from 'vue-router';
import LoginComponent from './app/base/components/LoginComponent';

const router = new VueRouter({
    routes:[
     { path: '/login', component: LoginComponent }
    ]
 });
 router.beforeEach((to,from,next)=>{
    if(to.matched.length == 0){
        return void next('/login');
    }
    if(to.path == '/login'){
        next();   
    }else{//判断用户是否登录
        next();
    }
 })
export default router;