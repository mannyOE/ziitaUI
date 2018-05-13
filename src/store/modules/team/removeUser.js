import api from '@/api/team'

// Remember to update resetState mutation
const state = {
  sub: {
    error: false,
    successMsg: 'User was removed successfully.',
    loading: false,
    loadingId: null,
    unauthorized: null,
    unverified: null,
    notfound: false,
  }
}

// getters
const getters = {
  error: state => state.sub.error,
  notfound: state => state.sub.notfound,
  unauthorized: state => state.sub.unauthorized,
  unverified: state => state.sub.unverified,
  successMsg: state => state.sub.successMsg,
  loading (state) {
    return function (id) {
      if (id === state.sub.loadingId) {
        return state.sub.loading
      }
      return false
    }
  },
  loadingId: state => state.sub.loadingId,
}

// actions
const actions = {
  removeUser ({ dispatch, commit, state }, args) {
    //
    commit('loading', args.id);

    return api.removeUser(args)
    .then((result) => {
      if (result.error === undefined) {
        // Success
        commit('clearErrors');

        // Use response body
        const data = result.data

        commit('notLoading', args.id);
        return true;
      }
      // else
      // Failed
      if (result.unauthorized) {
        commit('isAuthError');
      }
      commit('setVerification', result.unverified);
      commit('setNotFound', result.notfound);

      commit('setError', result.error);
      commit('notLoading', args.id);
      return false;
    })
  },deleteUser ({ dispatch, commit, state }, args) {
    //
    commit('loading', args.id);

    return api.deleteUser(args)
    .then((result) => {
      if (result.error === undefined) {
        // Success
        commit('clearErrors');

        // Use response body
        const data = result.data

        commit('notLoading', args.id);
        return true;
      }
      // else
      // Failed
      if (result.unauthorized) {
        commit('isAuthError');
      }
      commit('setVerification', result.unverified);
      commit('setNotFound', result.notfound);

      commit('setError', result.error);
      commit('notLoading', args.id);
      return false;
    })
  },
  clearErrors ({ commit, state }) {
    commit('clearErrors');
  },
  resetState ({ commit, state }) {
    commit('resetState');
  },
  load ({ commit, state }, id) {
    commit('loading', id);
  },
  stopLoading ({ commit, state }, id) {
    commit('notLoading', id);
  },
}

// mutations
const mutations = {
  loading (state, id) {
    state.sub.loading = true
    state.sub.loadingId = id
  },

  notLoading (state, id) {
    state.sub.loading = false
    state.sub.loadingId = id
  },

  setError (state, error) {
    state.sub.error = error;
  },

  setVerification (state, val) {
    state.sub.unverified = val;
  },

  resetState (state) {
    state.sub = {
      error: false,
      successMsg: 'User was removed successfully.',
      loading: false,
      loadingId: null,
      unauthorized: null,
      unverified: null,
      notfound: false,
    };
  },

  clearErrors (state) {
    state.sub.error = false;
  },

  setNotFound (state, val) {
    state.sub.notfound = val;
  },

  isAuthError (state) {
    state.sub.unauthorized = true;
  },

  notAuthError (state) {
    state.sub.unauthorized = false;
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
