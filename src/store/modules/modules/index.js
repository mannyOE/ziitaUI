import api from '@/api/modules'
import { moduleStatusTypes } from '@/constants'

import add from './add'
import accept from './accept'
import reject from './reject'
import byStatus from './byStatus'
import assignDev from './assignDev'
import remove from './remove'
import all from './all'

// Remember to update resetState mutation
const state = {
  sub: {
    status: null,
    error: false,
    loading: false,
     testUrl :'',
    testError : '',
    testing : false,
    modules: {
      new: {
        loading: true,
        error: false,
        modules: [],
      },
      inprogress: {
        loading: true,
        error: false,
        modules: [],
      },
      submitted: {
        loading: true,
        error: false,
        modules: [],
      },
      done: {
        loading: true,
        error: false,
        modules: [],
      },
    },
    notfound: false,
    unverified: false,
    unauthorized: null,
    module: {
      module_name: "",
      module_description: "",
      methods: [],
      dependency: [],
      category: [],
      end_date: "",
      dev_time: 1,
      files:[],
      developer_Id:""
    }
  }
}

// getters
const getters = {
  status: state => state.sub.status,
  error: state => state.sub.error,
  loading: state => state.sub.loading,
  modules: state => state.sub.modules,
  notfound: state => state.sub.notfound,
  unverified: state => state.sub.unverified,
  unauthorized: state => state.sub.unauthorized,
  module: state => state.sub.module,
    testing: state => state.sub.testing,
  testError: state => state.sub.testError,
  testUrl: state => state.sub.testUrl
}

// actions
const actions = {
  getTestUrl ({ dispatch, commit, state }, dargs) {
    // Loading
    // if (dargs.noLoad !== true) {
      commit('testing',true)
    // } else if (dargs.loader) {
    //   const load = dargs.loader.load
    //   dispatch(load.namespace, load.args, { root: true }).then(() => {
    //   });
    // }
   return api.getTestUrl(dargs)
    .then((result) => {

      if (result.error === undefined) {
          // Use response data
        const data = result.data;
        commit('setTestUrl', data.link);
         commit('testing',false)
        return data;
      } else {
        commit('setTestError', result.error)
        commit('setNotFound', result.notfound);
      }
       commit('testing',false)
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
  getModules ({ dispatch, commit, state }, dargs) {
    // Loading




    if (dargs.noLoad !== true) {
      commit('loading')
    } else if (dargs.loader) {
      const load = dargs.loader.load
      dispatch(load.namespace, load.args, { root: true }).then(() => {
      });
    }


    return api.getModules(dargs).then((modules) => {
        var newm = []; var progressm = []; var submittedm = []; var donem = [];
        if(modules.data){
          modules.data.forEach(function(m){
              if(m.status == 1){
                  newm.push(m);
              }

              if(m.status == 2){
                  submittedm.push(m);
              }

              if(m.status == 3){
                  donem.push(m);
              }

              if(m.status == 4){
                  progressm.push(m);
              }
          });
          commit('setNewModules', newm);
          commit('setInprogressModules', progressm);
          commit('setSubmittedModules', submittedm);
          commit('setDoneModules', donem);
          return true;
        }else{
          return false;
        }


    });

    const byStatusAction = 'modules/byStatus/getModules'

    // Get New Modules
    dargs.status = moduleStatusTypes.new.id

    dispatch(byStatusAction, dargs, {root: true})
    .then((modules) => {
      if (modules) {
        commit('setNewModules', modules)
      } else {
        commit('setNewModulesError', modules)
      }
    });

    // Get In Progress Modules
    dargs.status = moduleStatusTypes.inprogress.id
    
    dispatch(byStatusAction, dargs, {root: true})
    .then((modules) => {
      if (modules) {
        commit('setInprogressModules', modules)
      } else {
        commit('setInprogressModulesError', modules)
      }
    });

    // Get In Progress Modules
    dargs.status = moduleStatusTypes.inprogress_.id

    dispatch(byStatusAction, dargs, {root: true})
    .then((modules) => {
      if (modules) {
        commit('setInprogressModules_', modules)
      } else {
        commit('setInprogressModulesError', modules)
      }
    });

    // Get Submitted Modules
    dargs.status = moduleStatusTypes.submitted.id
    
    dispatch(byStatusAction, dargs, {root: true})
    .then((modules) => {
      if (modules) {
        commit('setSubmittedModules', modules)
      } else {
        commit('setSubmittedModulesError', modules)
      }
    });

    // Get Done Modules
    dargs.status = moduleStatusTypes.done.id
    
    dispatch(byStatusAction, dargs, {root: true})
    .then((modules) => {
      if (modules) {
        commit('setDoneModules', modules)
      } else {
        commit('setDoneModulesError', modules)
      }
    });

    // Not Loading
    if (dargs.noLoad !== true) {
      commit('notLoading')
    } else if (dargs.loader) {
      const load = dargs.loader.stopLoading
      dispatch(load.namespace, load.args, { root: true }).then(() => {
      });
    }
  },

setModule({state}, module){
  state.sub.module = module;
},

  resetState ({ commit, state }) {
    commit('resetState');
  },
  resetModule({ commit, state }) {
 state.sub.module = {
   module_name: "",
   module_description: "",
   methods: [],
   dependency: [],
   category: [],
   end_date: "",
   dev_time: 1,
   files:[],
   developer_Id:""
  }
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
  testing (state,status) {
    state.sub.testing =  status
  }
  ,
  setTestUrl(state,url){
    state.sub.testUrl = url
  },
  setTestError(state,error){
    state.testError = error
  },
  notLoading (state) {
    state.sub.loading = false
  },

  setNewModules (state, modules) {
    state.sub.modules.new.loading = false;
    state.sub.modules.new.modules = modules;
  },

  setNewModulesError (state, value) {
    state.sub.modules.new.error = value
  },

  setInprogressModules (state, modules) {
    state.sub.modules.inprogress.loading = false
    state.sub.modules.inprogress.modules = modules
  },
  setInprogressModules_ (state, modules) {
    state.sub.modules.inprogress.loading = false
    state.sub.modules.inprogress.modules = state.sub.modules.inprogress.modules.concat(modules);
  },

  setInprogressModulesError (state, value) {
    state.sub.modules.inprogress.error = value
  },

  setSubmittedModules (state, modules) {
    state.sub.modules.submitted.loading = false
    state.sub.modules.submitted.modules = modules
  },

  setSubmittedModulesError (state, value) {
    state.sub.modules.submitted.error = value
  },

  setDoneModules (state, modules) {
    state.sub.modules.done.loading = false
    state.sub.modules.done.modules = modules
  },

  setDoneModulesError (state, value) {
    state.sub.modules.done.error = value
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

  resetState (state)
{
  //
  state.sub = {
    status: null,
    error: false,
    loading: false,
    modules: {
      new: {
        loading: true,
        error: false,
        modules: [],
      },
      inprogress: {
        loading: true,
        error: false,
        modules: [],
      },
      submitted: {
        loading: true,
        error: false,
        modules: [],
      },
      done: {
        loading: true,
        error: false,
        modules: [],
      },
    },
    notfound: false,
    unverified: false,
    unauthorized: null,
    module: {
      name: "",
      description: "yea",
      methods: [],
      dependency: [],
      totalTime: null,
      deadline: null,
      category: null,
      files: null,
      devId: null
    }

  }
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
  modules: {
    byStatus,
    add,
    accept,
    reject,
    assignDev,
    remove,
    all,
  }
}
