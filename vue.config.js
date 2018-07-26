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
        //这里为了兼容vue-charts的按需引用，貌似在官方的babel-loader里node_modules里面的都会被过滤
        //哪怕用了include，推测是exclude里面给忽略了，所里在这里又给它做了一层拦截
        config.module.rules.push({
            test: /\.js$/,
            loader: 'babel-loader',
            include: [
                resolve('node_modules/vue-echarts'),
                resolve('node_modules/resize-detector')
            ]
        })
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
    }
}