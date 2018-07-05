//@see document of the config https://cli.vuejs.org/config/#vue-config-js
module.exports = {
    //@see all the config of devServe https://webpack.js.org/configuration/dev-server/
    devServer:{
        host:'0.0.0.0',//默认本机地址为http://localhost:8080  局域网为本机内网ip:8080
        port:'3000',
        open:false,//是否自动打开网页
    }
}