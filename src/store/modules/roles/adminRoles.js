import api from '@/api/team'

// Remember to update resetState mutation
const state = {
  sub: {
    error: false,
    loading: false,
    adminRoles: {},
    notfound: false,
    unverified: false,
    unauthorized: null,
  }
}

// getters
const getters = {
  error: state => state.sub.error,
  loading: state => state.sub.loading,
  adminRoles: state => state.sub.adminRoles,
  notfound: state => state.sub.notfound,
  unverified: state => state.sub.unverified,
  unauthorized: state => state.sub.unauthorized,
}

// actions
const actions = {
  getadminRoles ({ dispatch, commit, state }, dargs) {
    /**
     * Retrieve all the roles for a client
     */
    // Loading

    // console.log(dargs.Id);
    api.getRoles(dargs)
    .then((result) => {
      if (result.error === undefined) {
        // console.log(result);
        commit('clearErrors');
        // Use response data
        const data = result.data;
        commit('setadminRoles', data);

      } else {
        if (result.unauthorized) {
          commit('isAuthError');
        }
        if (result.verified) {
          commit('isVerificationError');
        }
        commit('setError', result.error);
        commit('setNotFound', result.notfound);
      }
    })
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
  },

  notLoading (state) {
    state.sub.loading = false
  },

  setError (state, error) {
    state.sub.error = error
  },

  clearErrors (state) {
    state.sub.error = false
    state.sub.unverified = false
    state.sub.notfound = false
    state.sub.unauthorized = false
  },

  resetState (state) {
    state.sub = {
      error: false,
      loading: false,
      adminRoles: {},
      notfound: false,
      unverified: false,
      unauthorized: null,
    };
  },

  setadminRoles (state, adminRoles) {
    state.sub.adminRoles = adminRoles || {}
  },

  setNotFound (state, val) {
    state.sub.notfound = val;
  },

  isVerificationError (state) {
    state.sub.unverified = true;
  },

  notVerificationError (state) {
    state.sub.unverified = false;
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
  mutations,
}
