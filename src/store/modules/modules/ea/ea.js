import api from '@/api/qa'

// Remember to update resetState mutation
const state = {
  sub: {
    error: false,
    loading: false,
    mods: [],
    stats: {},
    notfound: false,
    unverified: false,
    unauthorized: null,
  }
}

// getters
const getters = {
  error: state => state.sub.error,
  loading: state => state.sub.loading,
  mods: state => state.sub.mods,
  stats: state => state.sub.stats,
  notfound: state => state.sub.notfound,
  unverified: state => state.sub.unverified,
  unauthorized: state => state.sub.unauthorized,
}

// actions
const actions = {
  postCase ({ dispatch, commit, state }, dargs) {
    /**
     * Retrieve all the roles for a client
     */
    // Loading

    // console.log(dargs.Id);
    return api.methodTest(dargs)
    .then((result) => {
      if (result.error === undefined) {
        // console.log(result);
        commit('clearErrors');
        // Use response data
        return true;

      } else {
        if (result.unauthorized) {
          commit('isAuthError');
        }
        if (result.verified) {
          commit('isVerificationError');
        }
        commit('setError', result.error);
        commit('setNotFound', result.notfound);
        return false;
      }
    })
  },



  fetchMods ({ dispatch, commit, state }, dargs) {
    /**
     * Retrieve all the roles for a client
     */
    // Loading

    // console.log(dargs.Id);
    return api.getModuleMethods(dargs)
    .then((result) => {
      if (result.error === undefined) {
        console.log("sdsd",result);
        commit('clearErrors');
        // Use response data
          const data = result.data;
          const stats = result.stats;
          commit('setStats', stats);
          commit('setMods', data);
          return true;

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

  completeModule ({ dispatch, commit, state }, dargs) {
    /**
     * Retrieve all the roles for a client
     */
    // Loading

    // console.log(dargs.Id);
    return api.completeMod(dargs)
    .then((result) => {
      if (result.error === undefined) {
        // console.log(result);
        commit('clearErrors');
        // Use response data
          return true;

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
      testCases: [],
      stats: {},
      notfound: false,
      unverified: false,
      unauthorized: null,
    };
  },

  setMods (state, data) {
    state.sub.mods = data || [];
  },
  setStats (state, stats) {
    state.sub.stats = stats || [];
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
