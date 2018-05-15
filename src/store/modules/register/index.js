import api from '@/api/register';

// Remember to update resetState mutation

const state = {
  sub: {
    status: null,
    error: false,
    fieldErrors: {},
    successMsg: 'Registered successfully.',
    loading: false,
    success: false,
    single: [],
  },
};

// getters
const getters = {
  status: state => state.sub.status,
  error: state => state.sub.error,
  fieldErrors: state => state.sub.fieldErrors,
  successMsg: state => state.sub.successMsg,
  loading: state => state.sub.loading,
  success: state =>state.sub.success,
  single: state => state.sub.single,
};

// actions
const actions = {
  register ({ dispatch, commit, state }, args) {
    commit('loading');
    return api.register(args)
    .then((result) => {
      if (result.error === undefined && result.data && result.data.status) {
        commit('clearErrors');
        if(args.Email.length === 0){
          args.Email = result.data.Email
        }
        if(result.data.type == 2) {
          return dispatch('auth/login', args, {root: true})
              .then(function (status) {
                commit('notLoading');
                return status;
              });
        }else{
          return result;
        }
      } else {
        commit('failure');

        // Turn field errors to obj instead of array
        let fieldErrors;
        try {
          fieldErrors = errorToObj(result.data)
        } catch (TypeError) {
          // Do Nada
        }
        commit('setFieldErrors', fieldErrors);

        commit('setError', result.error);
        commit('notLoading');
        return result;
      }

    });
  },
  getInvited ({ dispatch, commit, state }, args) {
    return api.getInvited(args)
    .then((result) => {

      if(result.status == 200){
        commit('singleInvite', result.data.data)
      }

    });
  },
  clearErrors ({ commit, state }) {
    commit('clearErrors');
  },
  clearFieldErrors ({ commit, state }) {
    commit('clearErrors');
  },
  resetState ({ commit, state }) {
    commit('resetState');
  },
};

// mutations
const mutations = {
  loading (state) {
    state.sub.loading = true;
  },
  singleInvite(state, data){
    let single = []
    data.map(res=>{
      single = res
    })
    state.sub.single = single || []
  },

  notLoading (state) {
    state.sub.loading = false;
  },

  setError (state, error) {
    state.sub.error = error;
  },

  setFieldErrors (state, error) {
    state.sub.fieldErrors = error || {};
  },

  clearErrors (state) {
    state.sub.fieldErrors = false;
    state.sub.error = false;
    state.sub.status = null;
  },

  resetState (state) {
    state.sub = {
      status: null,
      error: false,
      fieldErrors: {},
      successMsg: 'Registered successfully.',
      loading: false,
      success: false
    };
  },

  clearFieldErrors (state) {
    state.sub.fieldErrors = false;
  },

  success (state) {
    state.sub.status = true;
  },

  failure (state) {
    state.sub.status = false;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
