import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VeeValidate from 'vee-validate'

Vue.use(VeeValidate);

/* eslint-disable*/
var vm =  new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
