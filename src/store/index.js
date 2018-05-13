import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import * as Cookies from 'js-cookie';
import * as actions from './actions';
import * as getters from './getters';

// Store modules
import auth from './modules/auth';
import register from './modules/register';
import projects from './modules/projects';
import projectManager from './modules/projectManager';
import team from './modules/team';
import modules from './modules/modules';
import users from './modules/users';
import categories from './modules/categories';
import chat from './modules/chat';
import wallet from './modules/wallet';
import forgotPassword from './forgotPassword';
import feedback from './modules/feedback/feedback'
import roles from './modules/roles/index'
import Admin from './modules/roles/adminRoles'
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
      paths: ['userCredentials', 'persistentState']
    })
  ],
  actions,
  getters,
  modules: {
    auth,
    register,
    userCredentials,
    persistentState,
    projects,
    projectManager,
    team,
    modules,
    users,
    categories,
    chat,
    wallet,
    forgotPassword,
    feedback,
    roles,
    Admin,
    // socket
  }
});
