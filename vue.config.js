//@see document of the config https://cli.vuejs.org/config/#vue-config-js
const path = require('path');
module.exports = {
    //@see all the config of devServe https://webpack.js.org/configuration/dev-server/
    devServer:{
        host:'0.0.0.0',//默认本机地址为http://localhost:8080  局域网为本机内网ip:8080
        port:'3000',
        open:false//是否自动打开网页
    },
    //webpack的具体配置项 @see all the config of configureWebpack https://cli.vuejs.org/guide/webpack.html#simple-configuration
    configureWebpack:{
        resolve:{
            alias:{
                '@':path.resolve(__dirname,'src'),
                'app':path.resolve(__dirname,'src/app')
            }
        },
        devtool: 'inline-source-map',//还是这个devtool用的比较舒心(*^▽^*)
    }
}