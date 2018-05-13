import api from '@/api/categories'

import add from './add'
import edit from './edit'
import byid from './byid'
import skills from './skills'
import remove from './delete'

// Remember to update resetState mutation
const state = {
  sub: {
    status: null,
    error: false,
    loading: false,
    categories: [],
    notfound: false,
    unverified: false,
    unauthorized: null,
    mz: "y"
  }
}

// getters
const getters = {
  status: state => state.sub.status,
  error: state => state.sub.error,
  loading: state => state.sub.loading,
  categories: state => state.sub.categories,
  notfound: state => state.sub.notfound,
  unverified: state => state.sub.unverified,
  unauthorized: state => state.sub.unauthorized,
  mz: state => state.sub.mz,
}

// actions
const actions = {
  getCategories ({ dispatch, commit, state }, dargs) {
    // Loading
    if (dargs.noLoad !== true) {
      commit('loading')
    } else if (dargs.loader) {
      const load = dargs.loader.load
      dispatch(load.namespace, load.args, { root: true }).then(() => {
      });
    }

    api.getTeamCategories(dargs)
    .then((result) => {
      if (result.error === undefined) {
        commit('clearErrors');
        // Use response data
        const data = result.data
        commit('setCategories', data);
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
      status: null,
      error: false,
      loading: false,
      categories: [],
      notfound: false,
      unverified: false,
      unauthorized: null,
    };
  },

  setCategories (state, categories) {
  state.sub.mz = "this is me";
    state.sub.categories = categories || []
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
  modules: {
    byid,
    add,
    edit,
    remove,
    skills,
  }
}
