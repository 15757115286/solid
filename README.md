## 游览器兼容

主流游览器应该都可以，IE的话应该是IE9+都可以，这里只做过IE11的测试，是可以的。

## 路径说明

如果是以 app/ 开头的路径，那么代表的是从src/app下面查找
如果是以 @/ 开头的路径，那么代表是从src下面查找

## public文件夹


根据官网文档说明，这个文件夹是放置静态资源用的，这些和使用相对路径引用的资源的区别是放置在public文件夹下面的文件不会被webpack处理。
但是官方建议还是把assets放置在模块依赖比较好，这样的话发现错误会在编译的时候被发现而不会给用户404。
详见：https://cli.vuejs.org/guide/html-and-static-assets.html#the-public-folder

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
可以在vue实例中使用 this.$http.get()

## animation模块

animation是根据自己的一些需求编写的动画模块。具体的使用方法是this.$A(elem).animation(props,duration?,option?)。
this代指的是vue实例。
props是需要过渡的最终的css属性,duration为时间，option有3个参数 callback、tween、duration。分别代表的是动画结束后
的回调，过渡函数（如'linear','back.easeIn','base.easeInOut'等）、延时时间（延时时间动画一创建就开始计算，不会受到stop等影响）
特别封装了toggle,show,hidden函数，使用方法是this.$A(elem).toggle(duration?)。

## 关于echarts

由于这里在首次加载的时候会import echarts，所以会导致整个app.js会比之前大2M左右，在本地测试时候所花费的时间会比
没有引入echarts大概多300-400ms的时间。
所以这里在main.js中引用的话，可能不是太合适。我们使用懒加载的模块，第一个LoginComponent是直接加载的，而pageComponent是
用懒加载进行的，所以这个项目中在pageComponent中加载比较好。
这里的echarts改用了vue-charts组件,之前用的是指令的形式且没有按需加载，现在改成了按需加载。

## 关于prefetch

这里在官方文档中的解释是会预加载一些在不久之后会用到的资源，这个时间会是在页面加载完后的游览器空闲时间。
但是我在本地测试的时候是如果关闭这个功能，每次首屏加载的时间会节约大概100-300ms的时间（预加载内容大约7M），
这个时间是纯粹的下载时间，因为这里同样是用到了路由懒加载，这部分代码并不会在首屏的时候被执行。
所以在这里我先关闭了预加载功能。如果需要可以在vue.config.js的注释掉关闭的代码即可。
但会这部分资源的下载时间会在点击登录以后（跳转到相应组件）时候被加载。

## vue.config.js中的transpileDependencies（略坑）

这个对象是一个数组，里面的内容可以是字符串或者是正则对象。因为vue-cli中babel-loader默认是不对node_modules中的jsx?进行
转译的，但是如果我们的项目中直接引用了某个node_modules中的文件，那么就需要对这个文件进行转译，不然可能会不兼容低版本游览器。
之前我是用path.resolve去进行文件路径的转化放置到这个数组中，却一直发现该文件没有被babel-loader处理，折腾了很久去就翻源码，
发现他是用filepath.match(dep)来检测是否发生匹配的，坑的就是match这个函数。
一般我们用path.resove出来的地址是这样的："E:\\project\\node_modules\\xxxdir\\xxxfile.js"这样的路径。看到这里应该就明白了吧，
这里的双反斜杠中第一个反斜杠的作用是让第二个反斜杠看做一个普通的反斜杠，但是把这个字符串丢给match以后，它又会把这个字符串丢给
RegExp来转化成正则表达式，就相当于/E:\project\node_modules\xxxdir\xxxfile.js/这样的一个正则。这里的反斜杠又对project中的p
进行了转译，那肯定是匹配不到filepath(所有的filepath都是用的反斜杠（\）来分隔路径的)。
所以这里的解决方法是直接用正则或自己写的字符串，比如我们想对“node_modules/xxx"下的js进行babel-loader,那么可以写成下面这样的：
transpileDependencies:[/node_modules\\xxx/] 或者 transpileDependencies:["node_modules\\\\xxx"]
这样配置以后即可正常的使用transpileDependencies这个属性。