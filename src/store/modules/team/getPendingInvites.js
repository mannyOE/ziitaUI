import api from '@/api/team'

// Remember to update resetState mutation
const state = {
  sub: {
    error: false,
    loading: false,
    invites: [],
    notfound: false,
    unverified: false,
    unauthorized: null,
    team_Id: null,
  }
}

// getters
const getters = {
  error: state => state.sub.error,
  loading: state => state.sub.loading,
  invites: state => state.sub.invites,
  notfound: state => state.sub.notfound,
  unverified: state => state.sub.unverified,
  unauthorized: state => state.sub.unauthorized,
  team_Id: state => state.sub.team_Id,
}

// actions
const actions = {
  getPendingInvites ({ dispatch, commit, state }, dargs) {
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

    api.getPendingInvites(dargs)
    .then((result) => {
      if (result.error === undefined) {
        commit('clearErrors');
        // Use response data
        const data = result.data
        commit('setInvites', data);

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
 
  // getTeamByUserId ({ dispatch, commit, state }, dargs) {
  //   /**
  //    * Retrieve all the developers and project manager 
  //    * assigned to a project
  //    */
  //   // Loading
  //   if (dargs.noLoad !== true) {
  //     commit('loading')
  //   } else if (dargs.loader) {
  //     const load = dargs.loader.load
  //     dispatch(load.namespace, load.args, { root: true }).then(() => {
  //     });
  //   }

  //   api.getTeamByUserId(dargs)
  //   .then((result) => {
  //     if (result.error === undefined) {
  //       commit('clearErrors');
  //       // Use response data
  //       const data = result.data
  //       commit('setTeamId', result.data.team_Id);
  //     } else {
  //       if (result.unauthorized) {
  //         commit('isAuthError');
  //       }
  //       if (result.verified) {
  //         commit('isVerificationError');
  //       }
  //       commit('setError', result.error);
  //       commit('setNotFound', result.notfound);
  //     }
  //     // Not Loading
  //     if (dargs.noLoad !== true) {
  //       commit('notLoading')
  //     } else if (dargs.loader) {
  //       const load = dargs.loader.stopLoading
  //       dispatch(load.namespace, load.args, { root: true }).then(() => {
  //       });
  //     }
  //   })
  // },
  // resetState ({ commit, state }) {
  //   commit('resetState');
  // },
  // load ({ commit, state }, id) {
  //   commit('loading', id);
  // },
  // stopLoading ({ commit, state }, id) {
  //   commit('notLoading', id);
  // },
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
      invites: [],
      notfound: false,
      unverified: false,
    team_Id: null,
    unauthorized: null,
    };
  },

  setInvites (state, invites) {
    state.sub.invites = invites || []
  },
  setTeamId (state, teamId) {
    state.sub.team_Id = teamId || []
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
