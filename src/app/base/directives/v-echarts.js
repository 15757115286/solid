import Vue from 'vue';
import echarts from 'echarts';
import { noop } from 'app/utils/common'
let directive =  {
    bind: (el, binding) => {
        Vue.nextTick(() => {
            el.echartsInstance = echarts.init(el);

            el.resizeEventHandler = function () {
                el.echartsInstance.resize();
            };
            el.echartsInstance.setOption(binding.value);

            if ( window.attachEvent ) {
                window.attachEvent('onresize', el.resizeEventHandler);
            } else {
                window.addEventListener('resize', el.resizeEventHandler, false);
            }
        });
    },
    update: (el, binding) => {
        Vue.nextTick(() => {
            el.echartsInstance.setOption(binding.value);
        });
    },
    unbind: (el) => {
        el.echartsInstance.dispose();

        if ( window.attachEvent ) {
            window.detachEvent('onresize', el.resizeEventHandler);
        } else {
            window.removeEventListener('resize', el.resizeEventHandler, false);;
        }
    }
}
let useEcharts = ()=>{
    Vue.directive('echarts',directive);
    useEcharts = noop;
}

export default useEcharts