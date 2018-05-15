import api from '@/api/projects'

// Remember to update resetState mutation
const state = {
  sub: {
    error: false,
    loading: false,
    team: [],
    notfound: false,
    unverified: false,
    unauthorized: null,
  }
}

// getters
const getters = {
  error: state => state.sub.error,
  loading: state => state.sub.loading,
  team: state => state.sub.team,
  notfound: state => state.sub.notfound,
  unverified: state => state.sub.unverified,
  unauthorized: state => state.sub.unauthorized,
}

// actions
const actions = {
  getTeam ({ dispatch, commit, state }, dargs) {
    /**
     * Retrieve all the developers and project manager
     * assigned to a project
     */
    // Loading
    if (dargs.noLoad !== true) {
      commit('loading')
    } else if (dargs.loader) {
      const load = dargs.loader.load
      dispatch(load.namespace, load.args, { root: true }).then(() => {
      });
    }

    return api.getTeamByProjectId(dargs)
    .then((result) => {
      if (result.error === undefined) {
        commit('clearErrors');
        // Use response data
        const data = result.data
        commit('setTeam', data);
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

      // Not Loading
      if (dargs.noLoad !== true) {
        commit('notLoading')
      } else if (dargs.loader) {
        const load = dargs.loader.stopLoading
        dispatch(load.namespace, load.args, { root: true }).then(() => {
        });
      }
    })
  },
  getDeveloperByTeam ({ dispatch, commit, state }, dargs) {
    /**
     * Retrieve all the developers and project manager
     * assigned to a project
     */
    // Loading
    if (dargs.noLoad !== true) {
      commit('loading')
    } else if (dargs.loader) {
      const load = dargs.loader.load
      dispatch(load.namespace, load.args, { root: true }).then(() => {
      });
    }

    return api.getDeveloperByTeam(dargs)
    .then((result) => {
      if (result.error === undefined) {
        commit('clearErrors');
        // Use response data
        const data = result.data
        commit('setTeam', data);
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

      // Not Loading
      if (dargs.noLoad !== true) {
        commit('notLoading')
      } else if (dargs.loader) {
        const load = dargs.loader.stopLoading
        dispatch(load.namespace, load.args, { root: true }).then(() => {
        });
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
  clearErrors({ commit, state }){
    commit('clearErrors');
  }
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
      team: [],
      notfound: false,
      unverified: false,
      unauthorized: null,
    };
  },

  setTeam (state, team) {
    state.sub.team = team || []
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
