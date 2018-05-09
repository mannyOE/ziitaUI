import api from '@/api/login'
/* eslint-disable*/
// Remember to update resetState mutation
const state = {
  sub: {
    error: false,
    userError: false,
    redirectError: false,
    permissions: [],
    autherror: false,
    autherrorMsg: 'Email or password is incorrect',
    loading: false,
  }
}

// getters
const getters = {
  error: state => state.sub.error,
  userError: state => state.sub.userError,
  autherror: state => state.sub.autherror,
  permissions: state => state.sub.permissions,
  autherrorMsg: state => state.sub.autherrorMsg,
  redirectError: state => state.sub.redirectError,
  loading: state => state.sub.loading,
}

// actions
const actions = {
  login ({ dispatch, commit, state }, args) {

    commit('loading');

    return api.login(args)
    .then(function (result) {
      // console.log(result);
      return result;
    })
  },

  resend_confirmation ({ dispatch, commit, state }, args) {

    commit('loading');

    return api.resend_confirmation(args)
    .then(function (result) {

          return result;
    })
  },
  confirm_email({ dispatch, commit, state }, args) {

    return api.confirm_email(args)
    .then(function (result) {

          return result;
    })
  },

  setRedirectError ({ commit, state }, val) {
    commit('setRedirectError', val);
  },
  clearErrors ({ commit, state }) {
    commit('clearErrors');
  },
  resetState ({ commit, state }) {
    commit('resetState');
  },
}

// mutations
const mutations = {
  loading (state) {
    state.sub.loading = true
  },

  notLoading (state) {
    state.sub.loading = false
  },

  setError (state, error) {
    state.sub.error = error
  },

  setUserError (state, error) {
    state.sub.userError = error
  },

  setRedirectError (state, val) {
    state.sub.redirectError = val;
  },

  clearErrors (state) {
    state.sub.autherror = false;
    state.sub.redirectError = false;
    state.sub.loading = false;
    state.sub.error = false;
  },

  resetState (state) {
    state.sub = {
      error: false,
      userError: false,
      redirectError: false,
      autherror: false,
      autherrorMsg: 'Email or password is incorrect',
      loading: false,
    };
  },

  notVerified (state) {
    state.sub.error = true;
    state.sub.autherrorMsg = "Please confirm you account from your email"
  },

  isAuthError (state) {
    state.sub.autherror = true;
  },

  notAuthError (state) {
    state.sub.autherror = false;
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
