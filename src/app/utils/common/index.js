import store from '../../store'

const env = process.env.NODE_ENV;
export function isDev(){
    return env === 'development';
}
export function isPro(){
    return env === 'production';
}
export function isLogin(){
    return store.state.isLogin;
}