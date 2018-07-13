import store from '../../store'
import enviroment from 'app/environment'

const env = process.env.NODE_ENV;
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