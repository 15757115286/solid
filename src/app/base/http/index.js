import axios from 'axios'
import router from '@/router'
import { getIPConfig } from 'app/utils/common'
let config = getIPConfig();
let instance = axios.create({
    baseURL: config.HOST,
    timeout:5000
});
//axios自带的请求过滤
instance.interceptors.request.use(function (config) {
    let token = localStorage.getItem('token') ;
    token && (config.headers['HTTP_ACCESS_TOKEN'] = token);
    return config;
}, function (error) {
    return Promise.reject(error);
});
//axios自带的响应过滤
instance.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    return Promise.reject(error);
});
//请求成功统一拦截过滤
function processData(data,promise){
    if(data.code == 200){
        promise.callback(data.data);
    }else if(data.code == 500){
        router.push('/page/error/500');
    }else if(data.code == 401){
        router.push('/page/error/401')
    }else{
        router.push('/page/error/404');
    }
}
//请求失败统一拦截过滤
function processError(rej){
    router.push('/page/error/network');
}

function post(url,params = {},config = {},intercept = true){
    if(typeof config == 'boolean') [config,intercept] = [{},config];
    let promise = new generate();
    instance.post(url,params,config).then(res=>{
        if(intercept === false){
            promise.callback(res);
        }else{
            processData(res,promise);
        }
    },rej=>{
        if(intercept === false){
            promise.callback({
                error:true,
                response:rej
            })
        }else{
            processError(rej);
        }
    })
    return promise;
}

function get(url,params = {},config = {},intercept = true){
    if(typeof config == 'boolean') [config,intercept] = [{},config];
    config.params = params;
    let promise = new generate();
    instance.get(url,config).then(res=>{
        if(intercept === false){
            promise.callback(res);
        }else{
            processData(res,promise);
        }
    },rej=>{
        if(intercept === false){
            promise.callback({
                error:true,
                response:rej
            })
        }else{
            processError(rej);
        }
    })
    return promise;
}

function noop(){}

function generate(){
    this.callback = noop;
}

generate.prototype.do = function(fn){
    this.callback = fn;
}

export default {
    post,
    get
};
