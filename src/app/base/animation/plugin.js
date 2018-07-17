import cssAnimation from '.'
import { isNumber , isObject } from 'app/utils/common'
const defaultOption = {
    fps:60
}
cssAnimation.install = function(Vue,option){
    option = isObject(option) ? option : {};
    let mergeoption = Object.assign({},defaultOption,option);
    cssAnimation.Animation.setFps(mergeoption.fps);
    Vue.prototype.$A = cssAnimation;
}
export default cssAnimation;