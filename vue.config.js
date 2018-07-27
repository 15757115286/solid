//@see document of the config https://cli.vuejs.org/config/#vue-config-js
const path = require('path');

function resolve(transPath) {
    return path.resolve(__dirname, transPath);
}
//关闭eslint函数，原理是遍历webpack.config对象，找到vue-loader对象并删除
function closeEslint(config) {
    let rules = config.module.rules;
    let pos = -1;
    for (let i = 0; i < rules.length; i++) {
        let test = rules[i].test;
        if (test.source == '\\.(vue|(j|t)sx?)$') {
            pos = i;
            break;
        }
    }
    pos >= 0 && rules.splice(pos, 1);
}
module.exports = {
    //@see all the config of devServe https://webpack.js.org/configuration/dev-server/
    devServer: {
        host: '0.0.0.0', //默认本机地址为http://localhost:8080  局域网为本机内网ip:8080
        port: '3000',
        open: false //是否自动打开网页
    },
    configureWebpack: config => {
        //更改调试映射map
        const devtool = 'inline-source-map';
        config.devtool = devtool;
        //关闭eslint验证
        closeEslint(config);
    },
    chainWebpack: config => {
        config.resolve.alias.set('app', resolve('src/app'));
        //关闭资源预加载
        config.plugins.delete('prefetch')
    },
    transpileDependencies:[
        /node_modules\\vue-echarts/,
        /node_modules\\resize-detector/
    ]
}