import api from '@/api/modules'
// import store from '@/store'

// Remember to update resetState mutation
const state = {
  sub: {
    error: false,
    successMsg: 'Module was rejected successfully.',
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
  loading: state => state.sub.loading,
}

// actions
const actions = {
  rejectModule ({ dispatch, commit, state }, args) {
    commit('loading');

    return api.rejectModule(args)
    .then((result) => {
      if (result.error === undefined) {
        // commit('success');
        commit('clearErrors');

        // Use response body
        const data = result.data

        commit('notLoading', args.id);
        return true;
      }
      // else
      // commit('failure');
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
  loading (state) {
    state.sub.loading = true
    // state.sub.loadingId = id
  },

  notLoading (state) {
    state.sub.loading = false
    // state.sub.loadingId = id
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
      successMsg: 'Module was rejected successfully.',
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
