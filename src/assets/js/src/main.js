// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from '../vue.js'
import App from './App.vue'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#sitebotwidget',
  template: '<App/>',
  components: { App }
})
