/* eslint-disable no-new */
import Vue from 'vue'
import App from './App'
import router from './router'
import VueBar from 'vuebar' // 引用 vue-bar 指令扩展
import store from 'store' // 引入 vuex 实例 store
import echarts from 'echarts'
import VTooltip from 'v-tooltip' 
import 'assets/css/public.css' // 引入公共样式
import axios from 'axios'

axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
Vue.prototype.$echarts = echarts
Vue.use(VueBar)
Vue.use(VTooltip,{
	defaultPlacement: 'right-start',
	defaultClass: 'my-tooltip'
})
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

