import Vue from 'vue'
import App from './App'
import store from './store'
import request from '@/utils/request'
import log from '@/utils/log'
// let amapFile = require('@/common/amap-wx')
// let myAmapFun = new amapFile.AMapWX({key:'b717f36164e813fe5284cc5c67c6876e'})
Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$request = request
Vue.prototype.$log = log
// Vue.prototype.$map = myAmapFun
App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})
app.$mount()
