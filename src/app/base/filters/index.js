import Vue from 'vue'
import store from 'app/store'
import source from '@/assets/source/translate'

Vue.filter('translateMenu', function (value) {
    const local = store.state.local;//这个这有放在函数里面依赖才会被收集
    if(local == 'en'){//国际化英文的时候默认不翻译
        return value;
    }else{
        let zh = source.zh;
        return zh.menu[value] || value;
    }
})