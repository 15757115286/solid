## 游览器兼容

主流游览器应该都可以，IE的话应该是IE9+都可以，这里只做过IE11的测试，是可以的。

## 路径说明

如果是以 app/ 开头的路径，那么代表的是从src/app下面查找
如果是以 @/ 开头的路径，那么代表是从src下面查找

# vue.config.js

这个是配置文件，配置一些vue-cli-serve的一些内容

## devServe

这个是配置了本地运行时候的ip和端口等的一些信息。
详见：https://webpack.js.org/configuration/dev-server/

## configureWebpack

这个的配置信息和webpack.config.js一样，不过框架内置会有一套默认的配置，最后会和这个配置的对象合并。
如果这个是一个函数的话，会提供一个参数，参数是内置的webpack配置项，可以改变这个对象来改变webpack的配置。
详见：https://cli.vuejs.org/guide/webpack.html#simple-configuration

# page/administer

这个目录下面放置的是具体的业务模块，这里面有一个index.vue，里面只有一个<router-view></router-view>，这个目的是因为
在vue-router的嵌套路由里面必须在每一个路径都对应一个组件（angular的路由里面可以省略，并且会以子路由的组件去填充）。
如果没有这个index.vue的话必须把所有路由都直接注册到根路由page下面，不利于业务的划分，当然这个不是必须的。

我们在使用的时候可以把需要的组件注册到具体业务的router.js下面，然后在page目录下的router.js中引入业务路由即可，这样的
划分可以是每个模块的业务更加清晰，如果不同模块之间有联系，我们可以通过全局的vuex状态树来管理

## 开启/关闭eslint验证

我们可以在vscode首选项中"vetur.validation.template": false|true来开启或者关闭摸板的语法验证，然后在vue.config.js中
使用函数closeEslint()来关闭或者注释该函数来开启eslint验证（closeEslint不是最佳的关闭eslint的方法）。

## ajax模块

本框架ajax使用的是vue官方推荐的axios，框架中只对常用的get和post进行了再封装。我们可以import http from 'app/base/http'来导入http。
值得一提的是这里的http有get和$get两种函数。$get是返回的promise对象，用法参考https://www.kancloud.cn/yunye/axios/234845。
get是这里进行的一次封装，我们使用 http.get(url,params,config?,intercept?).do(res=>{....}) 来使用。
intercept默认为true，会把一些请求失败的默认跳转到失败页面，这样的话我们可以只关心正确的数据，从而只需关心业务方面的代码。
这里的逻辑是按照自己的需求来实现的，可以自行修改。
如果想配合vuex的action来使用的话，推荐用$post和$get，因为这两个方法返回的是action中可以接受的Promise对象。