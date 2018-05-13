import model from '@/api/feedback'

// Remember to update resetState mutation
const state = {
  sub: {
    status: null,
    error: false,
    fieldErrors: {},
    successMsg: 'Project was edited successfully.',
    loading: false,
    retrieve: []
  }
}

// getters
const getters = {
  status: state => state.sub.status,
  error: state => state.sub.error,
  fieldErrors: state => state.sub.fieldErrors,
  loading: state => state.sub.loading,
  retrieve: state => state.sub.retrieve,
}

// actions
const actions = {
  sendFeedback ({ dispatch, commit, state }, dargs) {
    // Loading
    if (dargs.noLoad !== true) {
      commit('loading')
    } else if (dargs.loader) {
      const load = dargs.loader.load
      dispatch(load.namespace, load.args, { root: true }).then(() => {
      });
    }

    return model.feedback(dargs)
    .then((result) => {
      if (result.error === undefined) {
          commit ('notLoading')
        return result
    }

      if (dargs.noLoad !== true) {
        commit('notLoading')
      } else if (dargs.loader) {
        const load = dargs.loader.stopLoading
        dispatch(load.namespace, load.args, { root: true }).then(() => {
        });
      }
      commit('notLoading')
      return result;
    })
  },
  retrieveNotification ({ dispatch, commit, state }, args) {
  // Loading
  // if (dargs.noLoad !== true) {
  //   commit('loading')
  // } else if (dargs.loader) {
  //   const load = dargs.loader.load
  //   dispatch(load.namespace, load.args, { root: true }).then(() => {
  //   });
  // }

  return model.retrieve(args)
  .then((result) => {
    if (result.error === undefined) {
        commit ('notLoading')
        commit('retrieve', result.data.data)
      return result
  }

    // if (dargs.noLoad !== true) {
    //   commit('notLoading')
    // } else if (dargs.loader) {
    //   const load = dargs.loader.stopLoading
    //   dispatch(load.namespace, load.args, { root: true }).then(() => {
    //   });
    // }
    commit('notLoading')
    return result;
  })
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
    state.sub.loading = true;
  },

  retrieve(state, data) {
    state.sub.retrieve = data || []
  },

  notLoading (state) {
    state.sub.loading = false;
  },

  setError (state, error) {
    state.sub.error = error;
  },


  resetState (state) {
    state.sub = {
      status: null,
      error: false,
      fieldErrors: {},
    //   successMsg: 'Project was edited successfully.',
      loading: false,
    };
  },

  clearErrors (state) {
    state.sub.fieldErrors = false;
    state.sub.error = false;
    state.sub.status = null;
  },

  clearFieldErrors (state) {
    state.sub.fieldErrors = false;
  },

  success (state) {
    state.sub.status = true;
  },

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
