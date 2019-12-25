// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Chen from './CHEN'
import Antd from 'ant-design-vue'
import router from './router'
import store from './store'
import request from 'utils/request'
import db from 'utils/localstorage'
import VueApexCharts from 'vue-apexcharts'


import 'ant-design-vue/dist/antd.css'
Vue.config.productionTip = false
Vue.use(Antd)
Vue.use(VueApexCharts)
Vue.use(db)

Vue.component('apexchart', VueApexCharts)

Vue.use({
    install(Vue) {
        Vue.prototype.$db = db
    }
})

Vue.prototype.$post = request.post
Vue.prototype.$get = request.get
Vue.prototype.$put = request.put
Vue.prototype.$delete = request.delete
Vue.prototype.$export = request.export
Vue.prototype.$download = request.download
Vue.prototype.$upload = request.upload

/* eslint-disable no-new */
new Vue({
    el: '#chen',
    router,
    store,
    components: { Chen },
    template: '<Chen/>'
})