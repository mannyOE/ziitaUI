// import VueSocketio from 'vue-socket.io'; 
import api from '@/api/categories'

// Remember to update resetState mutation
const state = {
  sub: {
    status: null,
    error: false,
    loading: false,
    messages: [],
    message:[],
    loaded: false
  }
}



// getters
const getters = {
  status: state => state.sub.status,
  error: state => state.sub.error,
  loading: state => state.sub.loading,
  messages: state => state.sub.messages,
  loaded: state => state.sub.loaded,

}

// actions
const actions = {
GetMessages ({ dispatch, commit, state }, dargs) {
        // Loading
    
        return api.getMessage(dargs)
            .then((result) => {
                if (result.error === undefined) {
                    // Successful
                    commit('clearErrors');

                    // Use response body
                    const data = result.data
                    //
                    commit("messages",data);

                    // Not Loading
                    if (dargs.noLoad !== true) {
                        commit('notLoading')
                    } else if (dargs.loader) {
                        const load = dargs.loader.stopLoading
                        dispatch(load.namespace, load.args, { root: true }).then(() => {
                        });
                    }
                    // return returnObject;
                }
                
            })
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
  messages(state,data){
    state.sub.messages  = data;
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
    // state.sub = {
    //   status: null,
    //   error: false,
    //   loading: false,
    //   messages: [],
    //   notfound: false,
    //   unverified: false,
    //   unauthorized: null,
    // };
  },

  setMessage (state, message) {
    // state.sub.messages.push(message)
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
