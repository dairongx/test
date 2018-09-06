// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import '@/public/css/reset.css'
import '@/public/css/icon.css'
import 'lib-flexible/flexible'
import * as filter from '@/filter/filter'

Object.keys(filter).map(key=>Vue.filter(key,filter[key]))

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
    store,
  components: { App },
  template: '<App/>'
})
