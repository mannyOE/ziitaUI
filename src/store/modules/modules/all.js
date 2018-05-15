import api from '@/api/modules'

// Remember to update resetState mutation
const state = {
  sub: {
    error: false,
    mid: "okay",
    loading: false,
    modules: [],
    mods: [],
    notfound: false,
    unverified: false,
    unauthorized: null
  }
}

// getters
const getters = {
  error: state => state.sub.error,
  loading: state => state.sub.loading,
  modules: state => state.sub.modules,
  mods: state => state.sub.mods,
  notfound: state => state.sub.notfound,
  unverified: state => state.sub.unverified,
  unauthorized: state => state.sub.unauthorized,
  mid: state => state.sub.mid
}

// actions
const actions = {
  getModules ({ dispatch, commit, state }, dargs) {
    /**
     * Retrieve modules by project id
     */
    // Loading
    //
    if (dargs.noLoad !== true) {
      commit('loading')
    } else if (dargs.loader) {
      const load = dargs.loader.load
      dispatch(load.namespace, load.args, { root: true }).then(() => {
      });
    }

    return api.getModules(dargs)
    .then((result) => {
      if (result.error === undefined) {
        commit('clearErrors');
        // Use response data
        const data = result.data
        commit('setModules', data);

        // Not Loading
        if (dargs.noLoad !== true) {
          commit('notLoading')
        } else if (dargs.loader) {
          const load = dargs.loader.stopLoading
          dispatch(load.namespace, load.args, { root: true }).then(() => {
          });
        }

        // Return Modules
        return data
      } else {
        if (result.unauthorized) {
          commit('isAuthError');
        }
        if (result.verified) {
          commit('isVerificationError');
        }
        commit('setError', result.error);
        commit('setNotFound', result.notfound);

        // Not Loading
        if (dargs.noLoad !== true) {
          commit('notLoading')
        } else if (dargs.loader) {
          const load = dargs.loader.stopLoading
          dispatch(load.namespace, load.args, { root: true }).then(() => {
          });
        }
        return false
      }
    })
  },
   readRepository ({ dispatch, commit, state }, dargs) {
    /**
     * Retrieve modules by project id
     */
    // Loading

    if (dargs.noLoad !== true) {
      commit('loading')
    } else if (dargs.loader) {
      const load = dargs.loader.load
      dispatch(load.namespace, load.args, { root: true }).then(() => {
      });
    }

    return api.readRepository(dargs)
    .then((result) => {

      if (result.error === undefined) {
        commit('clearErrors');
        // Use response data
        const data = result.data
        //commit('setModules', data);

        // Not Loading
        if (dargs.noLoad !== true) {
          commit('notLoading')
        } else if (dargs.loader) {
          const load = dargs.loader.stopLoading
          dispatch(load.namespace, load.args, { root: true }).then(() => {
          });
        }

        // Repository
        return data;
      } else {
        if (result.unauthorized) {
          commit('isAuthError');
        }
        if (result.verified) {
          commit('isVerificationError');
        }
        commit('setError', result.error);
        commit('setNotFound', result.notfound);

        // Not Loading
        if (dargs.noLoad !== true) {
          commit('notLoading')
        } else if (dargs.loader) {
          const load = dargs.loader.stopLoading
          dispatch(load.namespace, load.args, { root: true }).then(() => {
          });
        }
        return false
      }
    })
  },
   getDevRepository ({ dispatch, commit, state }, dargs) {
    /**
     * Retrieve modules by project id
     */
    // Loading

    if (dargs.noLoad !== true) {
      commit('loading')
    } else if (dargs.loader) {
      const load = dargs.loader.load
      dispatch(load.namespace, load.args, { root: true }).then(() => {
      });
    }

    return api.getDevRepository(dargs)
    .then((result) => {

      if (result.error === undefined) {
        commit('clearErrors');
        // Use response data
        const data = result.data
        //commit('setModules', data);

        // Not Loading
        if (dargs.noLoad !== true) {
          commit('notLoading')
        } else if (dargs.loader) {
          const load = dargs.loader.stopLoading
          dispatch(load.namespace, load.args, { root: true }).then(() => {
          });
        }

        // Repository
        return data;
      } else {
        if (result.unauthorized) {
          commit('isAuthError');
        }
        if (result.verified) {
          commit('isVerificationError');
        }
        commit('setError', result.error);
        commit('setNotFound', result.notfound);

        // Not Loading
        if (dargs.noLoad !== true) {
          commit('notLoading')
        } else if (dargs.loader) {
          const load = dargs.loader.stopLoading
          dispatch(load.namespace, load.args, { root: true }).then(() => {
          });
        }
        return false
      }
    })
  },
  getRepository ({ dispatch, commit, state }, dargs) {
    /**
     * Retrieve modules by project id
     */
    // Loading

    if (dargs.noLoad !== true) {
      commit('loading')
    } else if (dargs.loader) {
      const load = dargs.loader.load
      dispatch(load.namespace, load.args, { root: true }).then(() => {
      });
    }

    return api.getRepository(dargs)
    .then((result) => {

      if (result.error === undefined) {
        commit('clearErrors');
        // Use response data
        const data = result.data
        //commit('setModules', data);

        // Not Loading
        if (dargs.noLoad !== true) {
          commit('notLoading')
        } else if (dargs.loader) {
          const load = dargs.loader.stopLoading
          dispatch(load.namespace, load.args, { root: true }).then(() => {
          });
        }

        // Repository
        return data;
      } else {
        if (result.unauthorized) {
          commit('isAuthError');
        }
        if (result.verified) {
          commit('isVerificationError');
        }
        commit('setError', result.error);
        commit('setNotFound', result.notfound);

        // Not Loading
        if (dargs.noLoad !== true) {
          commit('notLoading')
        } else if (dargs.loader) {
          const load = dargs.loader.stopLoading
          dispatch(load.namespace, load.args, { root: true }).then(() => {
          });
        }
        return false
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
      modules: [],
      mods: [],
      notfound: false,
      unverified: false,
      unauthorized: null,
    };
  },

  setModules (state, modules) {
    state.sub.modules = modules || []
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
