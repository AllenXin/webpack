import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import store from './store' // noinspection ES6CheckImport
import * as Filters from 'utils/filters'
import 'components/componentRegister'

import '@/permission' // 路由守卫处理权限
import 'element-ui/lib/theme-chalk/index.css' // element 样式
import 'normalize.css/normalize.css' // 浏览器样式初始化
import '@/styles/index.scss' // style下自定义样式
import 'utils/global'

Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'medium' })

Object.keys(Filters).forEach(T => Vue.filter(T, Filters[T])) // VUE注册全局filters

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
