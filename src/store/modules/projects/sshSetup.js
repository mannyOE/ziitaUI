import api from '@/api/projects'
// import { asyncLoader } from '@/store/generic'

// Remember to update resetState mutation
const state = {
  sub: {
    status: null,
    errorM: false,
    successM: false,
    successDocMsg: "Successfully Updated SSH detail",
    errorDocMsg: 'hello boss',
    notfound: false,
    loadingS: false,
    docker: {},
  }
}

// getters
const getters = {
  status: state => state.sub.status,
  // errorM: state => state.sub.errorM,
  notfound: state => state.sub.notfound,
  loading: state => state.sub.loadingS,
  success: state => state.sub.success,
  successs: state => state.sub.successs,
  successM: state => state.sub.successM,
  successDocMsg: state => state.sub.successDocMsg,
  docker: state =>state.sub.docker,
  errorM: state => state.sub.errorM
}

// actions
const actions = {
    updateSshDetails ({ dispatch, commit, state }, dargs) {
    // Loading
    if (dargs.noLoad !== true) {
      commit('loadingS')
    } else if (dargs.loader) {
      const load = dargs.loader.load
      dispatch(load.namespace, load.args, { root: true }).then(() => {
      });
    }

    return api.updateSsh(dargs)
    .then((result) => {

      if (result.error === undefined) {
        commit('clearErrors');
        // Use response data
        const data = result.data;
        commit('successSSH', result.data.message);
        return data.message;
      } else {
        commit('errorSSH', result.error)
        commit('setNotFound', result.notfound);
        return result.error;
      }

      // Not Loading
      if (dargs.noLoad !== true) {
        commit('notLoading')
      } else if (dargs.loader) {
        const load = dargs.loader.stopLoading
        dispatch(load.namespace, load.args, { root: true }).then(() => {
        });
      }
           commit('notLoading')
    })
  },
  
  getSshDetails({dispatch, state, commit}, dargs){
    if (dargs.noLoad !== true) {
        commit('loadingS')
      } else if (dargs.loader) {
        const load = dargs.loader.load
        dispatch(load.namespace, load.args, { root: true }).then(() => {
        });
      }
  
      api.getSsh(dargs)
      .then((result) => {

        if (result.error === undefined) {
          commit('clearErrors');
          // Use response data
          // const data = result.data;
          // commit('successSSH', result.data);
        } else {
          // commit('errorSSH', result.error)
          // commit('setNotFound', result.notfound);
        }
    }) 
},
  
 
  resetState ({ commit, state }) {
    commit('resetState');
  },
  load ({ commit, state }, id) {
    commit('loadingS', id);
  },
  stopLoading ({ commit, state }, id) {
    commit('notLoading', id);
  },
}

// mutations
const mutations = {
  loadingS (state) {
    state.sub.loadingS = true
  },

  notLoading (state) {
    state.sub.loadingS = false
  },

  successSSH (state, ssh){
    state.sub.successM = true;
    state.sub.successDocMsg = ssh.message;
  },
  errorSSH(state, ssh){
    state.sub.errorM = true;
    state.sub.errorDocMsg = ssh;
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
        errorM: false,
        successM: false,
        successDocMsg: "Successfully Updated SSH detail",
        errorDocMsg: null,
        notfound: false,
        loadingS: false,
        docker: {},
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
