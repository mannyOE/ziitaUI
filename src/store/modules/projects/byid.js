import api from '@/api/projects'
// import { asyncLoader } from '@/store/generic'

// Remember to update resetState mutation
const state = {
  sub: {
    status: null,
    flash:'',
    error: false,
    errorMsg:'',
    success: false,
    successMsg: "Successfully Updated Profile",
    notfound: false,
    loading: false,
    loadings: false,
    project: {},
    docker: {},
    successD: false,
    errorD: false,
    isTesting:false,
    successDocker: "successfully updated docker",
    modules: [],
    configTest:'',
    gitTest:'',
    urlTestError:false,
    urlTestSuccess:false,
    urlTestMessage:'Testing..',
    //saving a new docker
    successNewDocker: false,
    successNewDockerMsg : '' ,    
     errorNewDocker : false,
    errorNewDockerMsg : '',
    // successUpdateDocker: false,
    // successUpdateDockerMsg : '' ,    
    //  errorUpdateDocker : false,
    // errorUpdateDockerMsg : '',
    
  }
}

// getters
const getters = {
  status: state => state.sub.status,
  error: state => state.sub.error,
  notfound: state => state.sub.notfound,
  loading: state => state.sub.loading,
  success: state => state.sub.success,
  successMsg: state => state.sub.successMsg,
  successD: state => state.sub.successD,
  errorD: state => state.sub.errorD,  
  successDocker: state => state.sub.successDocker,
  configTest: state => state.sub.configTest,
  gitTest: state => state.sub.gitTest,
  project: state => state.sub.project,
  errorMsg: state => state.sub.errorMsg,
  docker: state =>state.sub.docker,
  modules: state => state.sub.modules,
  isTesting: state =>state.sub.isTesting,
  urlTestError:state=>state.sub.urlTestError,
  urlTestSuccess:state=>state.sub.urlTestSuccess,
  urlTestMessage:state=>state.sub.urlTestMessage,
  successNewDocker: state => state.sub.successNewDocker,
  errorNewDocker : state => state.sub.errNewDocker,
  successNewDockerMsg : state => state.sub.successNewDockerMsg ,    
  errorNewDockerMsg : state => state.sub.errorNewDockerMsg,
  loadings: state=>state.sub.loadings,
  // successUpdateDocker: state => state.sub.successUpdateDocker,
  // errorUpdateDocker : state => state.sub.errUpdateDocker,
  // successUpdateDockerMsg : state => state.sub.successUpdateDockerMsg ,    
  // errorUpdateDockerMsg : state => state.sub.errorUpdateDockerMsg,
}

// actions
const actions = {
  getProjectById ({ dispatch, commit, state }, dargs) {
    
    // Loading
    // if (dargs.noLoad !== true) {
    //   commit('loading')
    // } else if (dargs.loader) {
    //   const load = dargs.loader.load
    //   dispatch(load.namespace, load.args, { root: true }).then(() => {
    //   });
    // }

    return api.getProjectById(dargs)
    .then((result) => {
      

      if (result.error === undefined) {
        commit('clearErrors');
        // Use response data
        const data = result.data[0];

        commit('setProject', data);

        return data;
      } else {
        commit('errDoc', result.error)
        commit('setNotFound', result.notfound);
      }
      return {};
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
  
  updateProject ({ dispatch, commit, state }, dargs) {
    // Loading
    if (dargs.noLoad !== true) {
      commit('loading')
    } else if (dargs.loader) {
      const load = dargs.loader.load
      dispatch(load.namespace, load.args, { root: true }).then(() => {
      });
    }

    return api.updateProject(dargs)
    .then((result) => {
        
      if (result.error === undefined) {
          // Successful
          commit('clearErrors');
          commit('success', result.data.message);

          // Use response body
          var data = result.data
          data.state = true;
          commit('notLoading')
          // Not Loading
          if (dargs.noLoad !== true) {
              commit('notLoading')
          } else if (dargs.loader) {
              const load = dargs.loader.stopLoading
              dispatch(load.namespace, load.args, { root: true }).then(() => {
              });
          }
          return data;
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
      return result;
  })
  },
   testConfig ({ dispatch, commit, state }, dargs) {
    commit("setConfigTest","");
    if (dargs.noLoad !== true) {
      commit('setIsTesting',true)
    } else if (dargs.loader) {
      const load = dargs.loader.load
      dispatch(load.namespace, load.args, { root: true }).then(() => {
      });
    }
   return api.testConfig(dargs)
    .then((result) => {

        commit('setConfigTest', result.error || result.data.message);
        commit('setIsTesting',false)
    })
  },
  testGitUrl ({ dispatch, commit, state }, dargs) {
    // 
    commit('setUrlTestSuccessMessage',"Testing...");
    if (dargs.noLoad !== true) {
      // commit('setIsTesting',true)
    } else if (dargs.loader) {
      const load = dargs.loader.load
      dispatch(load.namespace, load.args, { root: true }).then(() => {
      });
    }
   return api.testGitUrl(dargs)
    .then((result) => {
      if (result.error === undefined) {
        commit('clearErrors');
        // Use response data
        return result.data.message;
      } else {
        return result.error;
      }


        // commit('setGitTest', result.error || );
        // commit('setIsTesting',false)
        
    })
  },
  setDefaultDocker ({ dispatch, commit, state }, dargs) {
    
    // Loading
    if (dargs.noLoad !== true) {
      commit('loading')
    } else if (dargs.loader) {
      const load = dargs.loader.load
      dispatch(load.namespace, load.args, { root: true }).then(() => {
      });
    }

    return api.setDefaultDocker(dargs)
    .then((result) => {
      
      if (result.error === undefined) {
          // Successful
          commit('clearErrors');
          // commit('successD', result.data.message);
          commit('notLoading')
          // Use response body
          return result;
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
     
      if (dargs.noLoad !== true) {
          commit('notLoading')
      } else if (dargs.loader) {
          const load = dargs.loader.stopLoading
          dispatch(load.namespace, load.args, { root: true }).then(() => {
          });
      }
      return result;
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

    return api.getDocker(dargs)
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

  //creating a new docker file
  createDocker ({ dispatch, commit, state }, dargs) {
    // Loading
    if (dargs.noLoad !== true) {
      commit('loading')
    } else if (dargs.loader) {
      const load = dargs.loader.load
      dispatch(load.namespace, load.args, { root: true }).then(() => {
      });
    }

    return    api.createDocker(dargs)
    .then((result) => {
      if (result.error === undefined) {
        commit('clearErrors');
        // Use response data
        // const data = result.data;
        commit('newDocker', result.data.message);
        commit('notLoading')
        return result;
      } 
        commit('errNewDocker', result.error)
        commit('setNotFound', result.notfound);
        commit ('notLoading')
         return result;

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
  updateDocker ({ dispatch, commit, state }, dargs) {
    // Loading
    if (dargs.noLoad !== true) {
      commit('loading')
    } else if (dargs.loader) {
      const load = dargs.loader.load
      dispatch(load.namespace, load.args, { root: true }).then(() => {
      });
    }

    return    api.updateDocker(dargs)
    .then((result) => {
      if (result.error === undefined) {
        commit('clearErrors');
        // Use response data
        // const data = result.data;
        commit('newDocker', result.data.message);
        commit('notLoading')
        
        return result.data.message;
      } 
        commit('errNewDocker', result.error)
        commit('setNotFound', result.notfound);
         return result.error;

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

  removeDocker ({ dispatch, commit, state }, dargs) {
    // Loading
    if (dargs.noLoad !== true) {
      commit('loading')
    } else if (dargs.loader) {
      const load = dargs.loader.load
      dispatch(load.namespace, load.args, { root: true }).then(() => {
      });
    }

    return    api.removeDocker(dargs)
    .then((result) => {
      if (result.error === undefined) {
        commit('clearErrors');
        // Use response data
        // const data = result.data;
        commit('newDocker', result.data.message);
        commit('notLoading')
        
        return result.data.message;
      } 
        commit('errNewDocker', result.error)
        commit('setNotFound', result.notfound);
         return result.error;

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
  loadings (state) {
    state.sub.loadings = true
  },
  notLoading (state){
    state.sub.loading = false;
  },
  notLoadings (state){
    state.sub.loadings = false;
  },
  setConfigTest (state,msg) {
    state.sub.configTest = msg


  },
  setGitTest (state,msg) {
    state.sub.gitTest = msg


  },
  setIsTesting (state,status) {
    state.sub.isTesting = status;
  },
  setUrlTestSuccessMessage(state,msg){
    state.sub.urlTestSuccess=true;
    state.sub.urlTestMessage=msg;
  },
  setUrlTestErrorMessage(state,msg){
    state.sub.urlTestError=true;
    state.sub.urlTestMessage=msg;
  },
  clearErrors(state){
    state.sub.urlTestError=false;
  },
  notLoading (state) {
    state.sub.loading = false
  },
  success (state, msg) {
    
    state.sub.success = true;
    state.sub.successMsg = msg;
  },
  successD (state, msg) {
    state.sub.success = true;
    state.sub.successDocker = msg;
  },

  setError (state, error) {
    state.sub.error = true;
    state.sub.errorMsg = error
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
    successMsg: "Successfully Updated Profile",
    notfound: false,
    loading: false,
    project: {},
    docker: {},
    successDocker: "successfully updated docker",
    errorDocker: "error updating docker",
    modules: [],
    loadings:false,
    };
  },

  clearErrors (state) {
    state.sub.error = false;
  },

  setProject (state, project) {

    state.sub.project = project || {}
  },
  newDocker(state, docker){
    state.sub.successNewDocker = true
    state.sub.successNewDockerMsg = docker || {}
  },
  errNewDocker(state, docker){
    state.sub.errorNewDocker = true;
    state.sub.errorNewDockerMsg = docker
  },

  newDocker1(state, docker){
    state.sub.successUpdateDocker = true
    state.sub.successUpdateDockerMsg = docker || {}
  },
  errNewDocker1(state, docker){
    state.sub.errorUpdateDocker = true;
    state.sub.errorUpdateDockerMsg = docker
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
