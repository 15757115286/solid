const defaultOption = {
    key:'id',//唯一主键
    value:'name',//值
    showIcon:false,//是否有图标
    showCheckBox:false,//是否显示勾选框
    expand:'expand',//是否展开
    selected:'selected',//是否选中
    children:'children',//子元素
    imgPath:'imgPath',//图片路径，优先级最高
    transImgPath:null,//用来转化imgpath的函数，返回路径 提供元素和mergeoption2个参数
    parent:'parent',//父元素
    changeImgPath:null//用来改变imgpath的函数，返回路径 提供元素和mergeoption2个参数
}
Object.freeze(defaultOption);
export default defaultOption;