import Vue from 'vue'
import ECharts from 'vue-echarts/components/ECharts'

// import ECharts modules manually to reduce bundle size
import {
    baseCharts,
    baseTools
} from './config'

baseCharts.forEach(initChart => {
    initChart();
})
baseTools.forEach(initTool => {
    initTool();
})

// register component to use
Vue.component('chart', ECharts)