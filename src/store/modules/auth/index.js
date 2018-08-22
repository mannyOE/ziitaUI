import api from '@/api/login';
import userApi from '@/api/user';

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
      commit('clearErrors');
        commit('resetState');

        // Log the previously logged in user out
        dispatch('userCredentials/logout', null, {root: true})
        .then(function (status) {
          // Logged out
        });

      if(result.status){
        // set token
        // debugger;
        dispatch('userCredentials/setToken', result.token, {root: true})
              .then(function (status) {
                // Token is set
              });

          // Set authentication in 'user' state
          dispatch('userCredentials/setAuthenticated', result.type, {root: true})
              .then(function (status) {
                // Auth is set
              });

            // Get User
          return dispatch('auth/getUser', { token: result.token }, {root: true})
          .then(status => {
              commit('notLoading');
              status.state = true;
              return status;
          });
      }else{
        commit('setError', result.message);
        var df = {};
        df.data = result;
        df.state = false;
        return df;
      }
    });
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
  getUser ({ dispatch, commit, state }, dargs) {
    commit('loading');

    return userApi.getUser(dargs)
    .then(function (result) {
      if (result.error === undefined) {
        // Got the user successfully
        commit('clearErrors');
        commit('resetState');

        // get user from response
        const user = result.data;

        // Set user data in 'user' state
        dispatch('userCredentials/setUser', user, {root: true})
        .then(function (status) {
          // User is set
        });

        commit('notLoading');
        return user;
      } else {
        // Failed to get user
        commit('clearErrors');
        commit('resetState');

        commit('setUserError', result.error);

        commit('notLoading');
        return false;
      }
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
