// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 移动端适配
import 'lib-flexible'
import baseComponents from '@/base'

Object.keys(baseComponents).forEach(key => {
  console.log(baseComponents[key]['name'])
  Vue.component(baseComponents[key]['name'], baseComponents[key])
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
