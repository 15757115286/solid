import defaultFileIcon from './icon/file.png'
import defaultDirOpenIcon from './icon/dir_open.png'
import defaultDirCloseIcon from './icon/dir_close.png'
const defaultOption = {
    key:'id',//唯一主键别名
    value:'name',//值别名
    showIcon:false,//是否有图标
    showCheckBox:false,//是否显示勾选框,
    showSearch:false,//是否显示树节点搜索框，如果是异步树的话只能所搜已经加载好的节点
    expand:'expand',//是否展开别名 如果是异步加载，expand事件会在expand加载成功后触发
    selected:'selected',//是否选中别名
    checked:'checked',//是否选中当前节点（如果节点没有该属性会自动添加）
    needLink:true,//勾选时候是否需要联动父节点
    children:'children',//子元素别名
    needChangeIcon:true,//我们可以调用changeImgPath函数来改变icon。当这个不存在的时候是否默认toggle图标。
    defaultFileIcon:defaultFileIcon,//默认的文件图标
    defaultDirOpenIcon:defaultDirOpenIcon,//默认的文件夹开的图标
    defaultDirCloseIcon:defaultDirCloseIcon,//默认的文件夹关的图标
    fileIcon:'fileIcon',//不是父节点的icon路径别名
    dirOpenIcon:'dirOpenIcon',//文件夹开图标路径别名
    dirCloseIcon:'dirCloseIcon',//文件夹关图标路径别名
    transImgPath:null,//用来转化imgpath的函数，返回路径 提供当前节点
    parent:'parent',//父元素别名（如果没有，会自动添加）
    changeImgPath:null,//用来改变imgpath的函数，返回路径 提供当前节点（只会在expand中被应用，其他时候想改变图标只能改节点中的imgPath(child.imgPath = 'xxxx')）
    needAnimation:true,//是否需要动画,
    isAsync:false,//是否是异步加载树节点
    loadData:null,//异步获取数据的方法，
    level:'level',//节点所处的层级，如果提供的数据中已经有该属性则不会自动去添加（谨慎）,
    beforeRender:null,//在每个节点被渲染前调用，提供节点和当前组件,在寻找图标路径前面执行(this绑定的是tree组件或者每个ul的组件)
    noData:'noData'//异步节点中判断是否还有数据（用来展示是否展开图标）,

}
Object.freeze(defaultOption);
export default defaultOption;