import Vue from 'vue'
import { isFunction } from '../common'
 
//全部事件通讯对象->这里直接借助vue的发布者-订阅者模式事件
let bus = new Vue();
bus['_appData'] = {};

function subscribe(name,callback){
    if(!isFunction(callback)) throw new TypeError('订阅者的回调必须是函数！');
    bus.$on(name,callback);
    return function(){
        bus.$off(name,callback);
    }
}

function notify(name,...params){
    bus.$emit(name,...params);
}

function add(name,obj){
    bus['_appData'][name] = obj;
}

function del(name){
    if(bus['_appData'][name]){
        Reflect.deleteProperty(bus['_appData'],name);
    }
}

function get(name){
    return bus['_appData'][name];
}

export default {
    subscribe,
    notify,
    add,
    del,
    get
}