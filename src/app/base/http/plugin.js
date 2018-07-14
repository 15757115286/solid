import http from '.';
let Httpplugin = {};
Httpplugin.install = function(Vue, option = {}){
    let $http = {};
    $http.get = http.get;
    $http.post = http.post;
    $http.all = http.all;
    if(option.needNative === true){
        $http.$get = http.$get;
        $http.$post = http.$post;
    }
    Vue.prototype.$http = $http;
}
export default Httpplugin;