import axios from 'axios'
import router from '@/router'
import { getIPConfig, isFunction } from 'app/utils/common'
let config = getIPConfig();
let instance = axios.create({
    baseURL: config.HOST,
    timeout: 5000
});
//axios自带的请求过滤
instance.interceptors.request.use(function (config) {
    let token = localStorage.getItem('token');
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
//请求成功统一拦截过滤，只处理data（经过自带的response拦截过滤）code为200的请求
//其他均返回到对应的错误页面 --> 针对自己逻辑来处理，会在all和get和post中使用
function processData(data, promise) {
    let success = false;
    if (data.code == 200) {
        success = true;
        promise.$success(data = data.data);
        return data;
    } else if (data.code == 500) {
        router.push('/page/error/500');
    } else if (data.code == 401) {
        router.push('/page/error/401')
    } else {
        router.push('/page/error/404');
    }
    if (!success) {
        promise.$error(data);
    }
    return data;
}
//请求失败统一拦截过滤，这里的错误包括url错误，超时等等
function processError(error, promise) {
    promise.$error(error);
    router.push('/page/error/network');
}

//axios的post，返回的Promise对象
function $post(url, params = {}, config = {}) {
    return instance.post(url, params, config);
}

//axios的get，返回的Promise对象
function $get(url, params = {}, config = {}) {
    config.params = params;
    return instance.get(url, config);
}

//自己封装好的post,返回的是一个generate对象，调用do函数来增加回调
//如果是开启拦截的才会调用error函数，如果不开启拦截，
//那么错误信息会通过do函数返回，没必要执行2遍相同的操作。
function post(url, params = {}, config = {}, intercept = true) {
    if (typeof config == 'boolean') [intercept, config] = [config, {}];
    let promise = new generate(intercept);
    promise.url = url;
    $post(url, params, config).then(res => {
        if (intercept === false) {
            promise.$success(res);
        } else {
            processData(res, promise);
        }
    }, rej => {
        if (intercept === false) {
            promise.$success({
                error: true,
                response: rej
            })
        } else {
            processError(rej, promise);
        }
    })
    return promise;
}

//自己封装好的get,返回的是一个generate对象，调用do函数来增加回调
function get(url, params = {}, config = {}, intercept = true) {
    if (typeof config == 'boolean') [intercept, config] = [config, {}];
    let promise = new generate(intercept);
    promise.url = url;
    $get(url, params, config).then(res => {
        if (intercept === false) {
            promise.$success(res);
        } else {
            processData(res, promise);
        }
    }, rej => {
        if (intercept === false) {
            promise.$success({
                error: true,
                response: rej
            })
        } else {
            processError(rej, promise);
        }
    })
    return promise;
}

//如果所有请求都完成，则会调用do函数，如果一个失败则会调用error（只执行一次）
//其他的函数的返回结果会忽略。（只支持封装的get和post，不支持$get和$post）
//如果函数都是默认不开启拦截的，那么所有的错误都会调用$success，此时也会调用all
//的do函数而不是error
function all(requests) {
    if(!Array.isArray(requests)) return;
    let count = 0, error = false;
    let promise = new generate();
    let length = requests.length;
    let result = Array(length);
    try{
        for (let i = 0; i < length; i++) {
            let _promise = requests[i];
            _promise
            .do(res => {
                if (!error) {
                    result[i] = res;
                    if (++count == length) {
                        promise.$success(result);
                    }
                }
            })
            .error(rej => {
                !error && (promise.$error({
                    url: _promise.url,
                    pos: i,
                    error: rej
                }));
                error = true;
            })
        }
    }catch(e){
        console.error(e);
    }
    return promise;
}

function noop() { }

function generate(intercept = true) {
    this.$success = this.$error = noop;
    this.intercept = intercept;
}

generate.prototype.do = function (fn) {
    isFunction(fn) && (this.$success = fn);
    return this;
}

generate.prototype.error = function (error) {
    let _this = this;
    this.$error = function (...params) {
        isFunction(error) && _this.intercept
            && error.apply(_this, params);
    }
    isFunction(error) && (this.$error = error);
    return this;
}

export default { $post, post, $get, get ,all}
