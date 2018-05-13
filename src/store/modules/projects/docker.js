import api from '@/api/projects'
// import { asyncLoader } from '@/store/generic'

// Remember to update resetState mutation
const state = {
  sub: {
    status: null,
    flash:'',
    error: false,
    success: false,
    successMssg: "Successfully Updated Profile",
    notfound: false,
    loading: false,
    project: {},
    docker: {},
  

    successD: false,
    errorD: false,
    successDocker: "successfully updated docker",
    modules: [],
  }
}

// getters
const getters = {
  status: state => state.sub.status,
  error: state => state.sub.error,
  notfound: state => state.sub.notfound,
  loading: state => state.sub.loading,
  success: state => state.sub.success,
  successMssg: state => state.sub.successMssg,
  successD: state => state.sub.successD,
  errorD: state => state.sub.errorD,  
  successDocker: state => state.sub.successDocker,

  project: state => state.sub.project,
  docker: state =>state.sub.docker,
  modules: state => state.sub.modules,
}

// actions
const actions = {
  updateDocker ({ dispatch, commit, state }, dargs) {
    // Loading
    if (dargs.noLoad !== true) {
      commit('loading')
    } else if (dargs.loader) {
      const load = dargs.loader.load
      dispatch(load.namespace, load.args, { root: true }).then(() => {
      });
    }

    api.updateDocker(dargs)
    .then((result) => {
      if (result.error === undefined) {
          // Successful
          commit('clearErrors');
          commit('successD', result.data.message);

          // Use response body
          const data = result.data
          const returnObject = {
              id: data.id,
              state: true,
          }

          // Not Loading
          if (dargs.noLoad !== true) {
              commit('notLoading')
          } else if (dargs.loader) {
              const load = dargs.loader.stopLoading
              dispatch(load.namespace, load.args, { root: true }).then(() => {
              });
          }
          return returnObject;
      }
      // else
      // Failed
      if (result.unauthorized) {
          commit('isAuthError');
      }
      commit('setVerification', result.unverified);
      commit('setNotFound', result.notfound);

      // Turn field errors to obj instead of array
      const fieldErrors = result.data;

      commit('setFieldErrors', fieldErrors);

      commit('setError', result.error);

      // Not Loading
      if (dargs.noLoad !== true) {
          commit('notLoading')
      } else if (dargs.loader) {
          const load = dargs.loader.stopLoading
          dispatch(load.namespace, load.args, { root: true }).then(() => {
          });
      }
      return false;
  })
  },

  getDocker ({ dispatch, commit, state }, dargs) {
    // Loading
    // if (dargs.noLoad !== true) {
    //   commit('loading')
    // } else if (dargs.loader) {
    //   const load = dargs.loader.load
    //   dispatch(load.namespace, load.args, { root: true }).then(() => {
    //   });
    // }

    api.getDocker(dargs)
    .then((result) => {
      if (result.error === undefined) {
        commit('clearErrors');
        // Use response data
        // const data = result.data;
        commit('setDocker', result.data.message);
      } 
        commit('setError', result.error)
        commit('setNotFound', result.notfound);

      // Not Loading
      // if (dargs.noLoad !== true) {
      //   commit('notLoading')
      // } else if (dargs.loader) {
      //   const load = dargs.loader.stopLoading
      //   dispatch(load.namespace, load.args, { root: true }).then(() => {
      //   });
      // }
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
  success (state, msg) {
    state.sub.success = true;
    state.sub.successMssg = msg;
  },
  successD (state, msg) {
    state.sub.successD = true;
    state.sub.successDocker = msg;
  },

  setError (state, error) {
    state.sub.error = true;
    state.sub.error = error
  },
  sucDoc (state, docker){
    state.sub.success = true;
    state.sub.successDocker = docker;
  },
  errDoc(state, message){
    state.sub.error = true;
    state.sub.errorDocker = message;
  },

  setNotFound (state, val) {
    state.sub.notfound = val;
  },

  setModules (state, val) {
    state.sub.modules = val || [];
  },
  setFlash (state, val){
    state.sub.flash = val ;
  },

  resetState (state) {
    state.sub = {
      status: null,
    flash:'',
    error: false,
    success: false,
    successMssg: "Successfully Updated Profile",
    notfound: false,
    loading: false,
    project: {},
    docker: {},
    successDocker: "successfully updated docker",
    errorDocker: "error updating docker",
    modules: [],
    };
  },

  clearErrors (state) {
    state.sub.error = false;
  },

  setProject (state, project) {
    state.sub.project = project || {}
  },



  setDocker (state, docker) { 
    state.sub.docker = docker || {}
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
