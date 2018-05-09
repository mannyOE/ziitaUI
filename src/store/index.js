/* eslint-disable*/
import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/authenticate';
Vue.use(Vuex);


export default new Vuex.Store({
  modules: {
    auth,
  }
});
