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