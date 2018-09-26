import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import store from './store' // noinspection ES6CheckImport

import pandaVue from 'panda-vue'

import 'components/componentRegister'

import '@/permission' // 路由守卫处理权限
import 'element-ui/lib/theme-chalk/index.css' // element 样式
import 'normalize.css/normalize.css' // 浏览器样式初始化
import '@/styles/index.scss' // style下自定义样式
import 'utils/global'

Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'medium' })
Vue.use(pandaVue)  // 组内组件

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
