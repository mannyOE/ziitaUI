import { API } from '../../config';
// Remember to update resetState mutation
const state = {
  sub: {
    project: {}, // name and description
    loading: false,
    api: API
  }
}

// getters
const getters = {
  project: state => state.sub.project,
  loading: state => state.sub.loading,
  api: state => state.sub.api,
}

// actions
const actions = {
  setProjectInitial ({ dispatch, commit, state }, dargs) {
    /**
     * Save the name and description of project 
     * about to be created in state
     */
    commit('setProjectInitial', dargs);
    return true;
  },

  getAPI(){
    return API;
  },

  resetState ({ dispatch, commit, state }) {
    /**
     * Clear all the saved data
     */
    commit('resetState');
  },
}

// mutations
const mutations = {
  resetState (state) {
    state.sub = {
      project: {}, // name and description
      loading: false,
    };
  },

  setProjectInitial (state, val) {
    const project = val || {};
    state.sub.project.name = project.name;
    state.sub.project.description = project.description;
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
