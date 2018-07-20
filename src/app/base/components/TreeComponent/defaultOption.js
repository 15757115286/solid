import defaultFileIcon from './icon/file.png'
import defaultDirOpenIcon from './icon/dir_open.png'
import defaultDirCloseIcon from './icon/dir_close.png'
const defaultOption = {
    key:'id',//唯一主键别名
    value:'name',//值别名
    showIcon:false,//是否有图标
    showCheckBox:false,//是否显示勾选框
    expand:'expand',//是否展开别名
    selected:'selected',//是否选中别名
    checked:'checked',//是否选中当前节点（如果节点没有该属性会自动添加）
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
    changeImgPath:null,//用来改变imgpath的函数，返回路径 提供当前节点
    needAnimation:false,//是否需要动画
}
Object.freeze(defaultOption);
export default defaultOption;