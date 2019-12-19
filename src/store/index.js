import Vue from 'vue'
import Vuex from 'vuex'
import account from './modules/account'
import setting from './modules/setting'

Vue.use(Vuex)

export default new Vuex.Store({
    //全局变量分组
    modules: {
        account,
        setting
    }
})