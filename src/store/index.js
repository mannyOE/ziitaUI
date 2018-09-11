import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import * as Cookies from 'js-cookie';
import * as actions from './actions';
import * as getters from './getters';

// Store modules
import auth from './modules/auth';
import users from './modules/users';
import forgotPassword from './forgotPassword';
// import socket from './modules/chat/socket';

// Modules with persistent states
import userCredentials from './modules/userCredentials';
import persistentState from './modules/persistentState';


Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      key: 'dmsState',
      getState: key => Cookies.getJSON(key),
      setState: (key, state) => Cookies.set(key, state, { expires: 14 }),
      paths: ['userCredentials', 'persistentState','team']
    })
  ],
  actions,
  getters,
  modules: {
    auth,
    userCredentials,
    persistentState,
    users,
    forgotPassword,
  }
});
