import api from '@/api/team'
import getProjects from './getProjects'
import getPendingInvites from './getPendingInvites'
import inviteUser from './inviteUser'
import suspendUser from './suspendUser'
import removeUser from './removeUser'
import getDeveloper from './getDeveloper'
import stats from './stats'
import subscribed from './subscribed'
import hireUser from './hireUser'
import getAllDeveloperTeam from './getAllDeveloperTeam'

// Remember to update resetState mutation
const state = {
  sub: {
    error: false,
    loading: false,
    team: [],
    notfound: false,
    unverified: false,
    unauthorized: null,
    denied: false,
  }
}

// getters
const getters = {
  error: state => state.sub.error,
  loading: state => state.sub.loading,
  team: state => state.sub.team,
  notfound: state => state.sub.notfound,
  unverified: state => state.sub.unverified,
  unauthorized: state => state.sub.unauthorized,
  denied: state =>state.sub.denied,
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
        commit('setTeam', data);
        if(result.denied){
          commit('setDenied', true);
        }
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
  setDenied(state, denied){
    state.sub.denied = denied;
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
      team: [],
      notfound: false,
      unverified: false,
      unauthorized: null,
    };
  },

  setTeam (state, team) {

    state.sub.team = team.data || []
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
    subscribed,
    getProjects,
    getPendingInvites,
    inviteUser,
    removeUser,
    suspendUser,
    stats,
    getDeveloper,
    hireUser,
    getAllDeveloperTeam,
  }
}
