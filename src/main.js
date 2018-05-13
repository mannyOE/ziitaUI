// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VeeValidate from 'vee-validate';
import router from './router'
import store from './store'
import VueSocketio from 'vue-socket.io';
import vmodal from 'vue-js-modal'


// Plugins
import GlobalComponents from './app/globalComponents'
import ElementUI from 'element-ui'
import prettycheckbox from 'pretty-checkbox';
import locale from 'element-ui/lib/locale/lang/en'
import vuescroll from 'vue-scroll'

// Css Assets
import 'element-ui/lib/theme-chalk/index.css'
// require('./assets/libs/font-awesome/css/font-awesome.css')
// require('./assets/libs/Ionicons/css/ionicons.min.css')
// // require('./assets/css/flexboxgrid.min.css')
// // import './assets/css/bootstrap-tagsinput.css';
// // import './assets/css/fixedstyles.css';
// require ('./assets/css/animate.css')
// require('./assets/css/bootstrap/css/bootstrap.min.css')
// import './assets/css/bootstrap/css/materialpaper.css';
// require('./assets/css/styles.css')
// require url('https://fonts.googleapis.com/css?family=Raleway:400,500');
// @import './assets/libs/montserrat-webfont/css/montserrat-webfont.min.css';

// chat css
// import "./assets/css/chat.css";
// import "./assets/css/media.css";

// cOfiguration of the vee validate
const config = {
  errorBagName: 'errors', // change if property conflicts
  fieldsBagName: 'fields',
  delay: 0,
  locale: 'en',
  dictionary: null,
  strict: true,
  classes: false,
  classNames: {
    touched: 'touched', // the control has been blurred
    untouched: 'untouched', // the control hasn't been blurred
    valid: 'valid', // model is valid
    invalid: 'invalid', // model is invalid
    pristine: 'pristine', // control has not been interacted with
    dirty: 'dirty' // control has been interacted with
  },
  events: 'input|blur',
  inject: true,
  validity: false,
  aria: true
};

Vue.use(VeeValidate, config);
// Register components that will be used alot globally to avoid excessive importing
Vue.use(GlobalComponents)
Vue.use(prettycheckbox)
Vue.use(ElementUI, { locale })
Vue.use(require('vue-moment'));
Vue.use(VueSocketio, Vue.prototype.$API);
Vue.use(vuescroll)
Vue.use(vmodal)

//Vue.config.productionTip = false

/* eslint-disable no-new */

export const eventBus = new Vue();

var vm = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  debug: true,
  components: { App }
}) 
