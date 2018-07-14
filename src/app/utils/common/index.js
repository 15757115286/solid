import store from '../../store'
import enviroment from 'app/environment'

const env = process.env.NODE_ENV;
const Obj = {};
const toString = Obj.toString;
export function isDev(){
    return env === 'development';
}
export function isProd(){
    return env === 'production';
}
export function isLogin(){
    return store.state.isLogin;
}
export function getIPConfig(){
    let config = isDev() ? enviroment.dev : 
        isProd() ? enviroment.prod : {};
    return config; 
} 
export function isSuccess(res){
    return !!(res && res.code == 200 && res.data.success == 1);
}
export function isFunction(fn){
    return toString.call(fn) === '[object Function]';
}