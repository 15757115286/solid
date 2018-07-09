import { isDev } from '../common'
export default {
    warn(...params){
        isDev() && window.console.warn.apply(window,params);
    },
    log(...params){
        isDev() && window.console.log.apply(window,params);
    },
    error(...params){
        isDev() && window.console.error.apply(window,params);
    },
    dir(...params){
        isDev() && window.console.dir.apply(window,params);
    }
};