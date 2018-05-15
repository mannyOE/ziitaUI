import api from '@/api/team'

// Remember to update resetState mutation
const state = {
  sub: {
    error: false,
    loading: false,
    roles: {},
    more: [],
    notfound: false,
    unverified: false,
    unauthorized: null,
  }
}

// getters
const getters = {
  error: state => state.sub.error,
  loading: state => state.sub.loading,
  roles: state => state.sub.roles,
  more: state => state.sub.more,
  notfound: state => state.sub.notfound,
  unverified: state => state.sub.unverified,
  unauthorized: state => state.sub.unauthorized,
}

// actions
const actions = {
  getRoles ({ dispatch, commit, state }, dargs) {
    /**
     * Retrieve all the roles for a client
     */
    // Loading

    // console.log(dargs);
    api.getRoles(dargs)
    .then((result) => {
      // console.log(result.more);
      if (result.error === undefined) {
        commit('clearErrors');
        // Use response data
        const data = result.data;
        commit('setRoles', data);
        commit('setMore',result.more);

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
  updatePermissions ({ dispatch, commit, state }, dargs) {
    // console.log(dargs);
    api.setRole(dargs)
    .then((result) => {
      // console.log(result.more);
      if (result.error === undefined) {
        commit('clearErrors');
        // Use response data
        const data = result.data;
        // commit('setRoles', data);
        // commit('setMore',result.more);


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
      roles: {},
      notfound: false,
      unverified: false,
      unauthorized: null,
    };
  },

  setRoles (state, roles) {
    state.sub.roles = roles || {}
  },
  setMore (state, more) {
    state.sub.more = more || []
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
