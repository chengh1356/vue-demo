import Vue from 'vue'
import Vuex from 'vuex'
import setting from './modules/settings'

Vue.use(Vuex)

export default new Vuex.Store({
    //全局变量分组
    modules: {
        setting
    }
})