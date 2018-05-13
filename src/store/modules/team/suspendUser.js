import api from '@/api/team'

// Remember to update resetState mutation
const state = {
  sub: {
    error: false,
    successMsg: 'User was suspended successfully.',
    loading: false,
    loadingId: null,
    unauthorized: null,
    unverified: null,
    notfound: false,
    activating: false
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
  activating: state => state.sub.activating
}

// actions
const actions = {
  suspendUser ({ dispatch, commit, state }, args) {
    commit('loading', args.id);

    return api.suspendUser(args)
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
  unsuspendUser ({ dispatch, commit, state }, args) {
    commit('isActivating', true);
    return api.unsuspendUser(args)
    .then((result) => {
      if (result.error === undefined) {
        // Success
        commit('clearErrors');

        // Use response body
        const data = result.data

        commit('isActivating', false);
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
      commit('isActivating', false);
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
  isActivating (state,status) {
    state.sub.activating = status;
  },

  setVerification (state, val) {
    state.sub.unverified = val;
  },

  resetState (state) {
    state.sub = {
      error: false,
      successMsg: 'User was suspended successfully.',
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
