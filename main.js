import Vue from 'vue'
import App from './App'
import {myrequest} from 'utils/api.js'

Vue.config.productionTip = false
Vue.prototype.$request = myrequest
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
