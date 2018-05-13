import api from '@/api/team'

// Remember to update resetState mutation
const state = {
    sub: {
      error: false,
      loading: false,
      subscribed: [],
      notfound: false,
      unverified: false,
      unauthorized: null,
    }
  }
  
  // getters
  const getters = {
    error: state => state.sub.error,
    loading: state => state.sub.loading,
    subscribed: state => state.sub.subscribed,
    notfound: state => state.sub.notfound,
    unverified: state => state.sub.unverified,
    unauthorized: state => state.sub.unauthorized,
  }
  
  // actions
  const actions = {
    getClientTeam ({ dispatch, commit, state }, dargs) {
      /**
       * Retrieve all the developers and project managers 
       * in a client's team
       */
      // Loading
      if(window.localStorage.getItem('getTeamById') === null){
        if (dargs.noLoad !== true) {
          commit('loading')
        } else if (dargs.loader) {
          const load = dargs.loader.load
          dispatch(load.namespace, load.args, { root: true }).then(() => {
          });
        }
      }
      
  return     api.getTeamById(dargs)
      .then((result) => {
        // 
        if (result.error === undefined) {
  
          commit('clearErrors');
          // Use response data
          const data = result.data
          commit('setSubscribed', data);
          commit('notLoading')
          return result.data.data;
  
        } else {
          if (result.unauthorized) {
            commit('isAuthError');
          }
          if (result.verified) {
            commit('isVerificationError');
          }
          commit('setError', result.error);
          commit('setNotFound', result.notfound);
          commit('notLoading')
          return result.error;
        }
  
        // 
  
        // Not Loading
        if (dargs.noLoad !== true) {
          commit('notLoading')
        } else if (dargs.loader) {
          
          const load = dargs.loader.stopLoading
          dispatch(load.namespace, load.args, { root: true }).then(() => {
          });
        }
  // commit('notLoading')
  
      }
  
      )
    },
    // setTeamById({commit, state}, data) {
    //   commit('setTeamById', data)
    // },
    resetState ({ commit, state }) {
      commit('resetState');
    },
    clearErrors ({ commit, state }) {
      commit('clearErrors');
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
        subscribed: [],
        notfound: false,
        unverified: false,
        unauthorized: null,
      };
    },
  
    setSubscribed (state, subscribed) {
  
      state.sub.subscribed = subscribed.data || []
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
  