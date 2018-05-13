import api from '@/api/login'
// import store from '@/store'

// Remember to update resetState mutation
const state = {
    sub: {
        error: false,
        errorMssg: 'Error',
        success: false,
        fieldErrors: {},
        successMsg: 'Email Sent',
        loading: false,
        unauthorized: null,
        unverified: null,
        notfound: false,
    },
};

// getters
const getters = {
    error: state => state.sub.error,
    success: state => state.sub.success,
    fieldErrors: state => state.sub.fieldErrors,
    notfound: state => state.sub.notfound,
    errorMssg: state =>state.sub.errorMssg,
    unauthorized: state => state.sub.unauthorized,
    unverified: state => state.sub.unverified,
    successMsg: state => state.sub.successMsg,
    loading: state => state.sub.loading,
}

// actions
const actions = {
    forgotPassword ({ dispatch, commit, state }, dargs) {
        // Loading
        if (dargs.noLoad !== true) {
            commit('loading')
        } else if (dargs.loader) {
            const load = dargs.loader.load
            dispatch(load.namespace, load.args, { root: true }).then(() => {
            });
        }

        return api.forgotPassword(dargs) 
            .then((result) => {

                if (result.status !== undefined) {
                    // Successful
                    commit('clearErrors');

                    if(result.data.status){
                        // commit('success', result.data.message);
                        commit('notLoading')
                    return result;
                    }
                    else {
                        // commit('setError', result.data.message)
                        commit('notLoading')
                        return result
                    }
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
 
                // commit('setError', result.data.message);

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
    clearErrors ({ commit, state }) {
        commit('clearErrors');
    },
    clearFieldErrors ({ commit, state }) {
        commit('clearErrors');
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
        state.sub.loading = true;
    },

    notLoading (state) {
        state.sub.loading = false;
    },

    setError (state, msg) {
        state.sub.error = true;
        state.sub.errorMssg= msg;
    },

    success (state, msg) {
        state.sub.success = true;
        state.sub.successMsg = msg;
    },

    setFieldErrors (state, error) {
        state.sub.fieldErrors = error || {};
    },

    resetState (state) {
        state.sub = {
            error: false,
            errorMssg: 'Error',
            success: false,
            fieldErrors: {},
            successMsg: 'Email Sent',
            loading: false,
            unauthorized: null,
            unverified: null,
            notfound: false,
        };
    },

    clearErrors (state) {
        state.sub.fieldErrors = false;
        state.sub.error = false;
    },

    clearFieldErrors (state) {
        state.sub.fieldErrors = false;
    },

    setNotFound (state, val) {
        state.sub.notfound = val;
    },

    setVerification (state, val) {
        state.sub.unverified = val;
    },

    isAuthError (state) {
        state.sub.unauthorized = true;
    },

    notAuthError (state) {
        state.sub.unauthorized = false;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
