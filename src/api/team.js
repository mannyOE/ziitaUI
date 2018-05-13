import { blackAxios } from '../config';
import { getAll, getById, add, edit, gDelete } from './generic';

export default {
  resource: {
    byId: 'Team/',
    //people_details /
    hireUser: 'hireables/request/',
    confirmHire: 'hireables/confirm/',
    getTeamByUserId: 'getTeamByUserId/',
    inviteUser: 'Invite/',
    removeUser: 'remove/',
    deleteUser: 'delete_user/',
    suspendUser: 'suspend/',
    unsuspendUser: 'activate/',
    pendingInvites: 'Invite/',
    getTeamProjects: 'projects/',
    stats: 'general/',
    devDetail: 'developers/',
    getDevTeam: 'people_details/',
    getPermission: 'administrator/permission/',
    setPermission: 'administrator/setPermission/'
  },

  getDeveloper (dargs) {
    /**
     * Get dev analysis in this team
     */
    return blackAxios.get(this.resource.devDetail + dargs.id, {
        'headers': { 'x-access-token': dargs.token }
      })
    .then(function (response) {
      return getAll.success({
        response: response,
        resource: 'data',
        more: more
      });
    })
    .catch(function (error) {
      return getAll.error({
        error: error,
        resource: ''
      });
    });
  },

  getRoles (dargs) {
    /**
     * Get dev analysis in this team
     */
    return blackAxios.get(this.resource.getPermission + dargs.Id, {
        'headers': { 'x-access-token': dargs.token }
      })
    .then(function (response) {
      // console.log(response.data.more);
      return getAll.success({
        response: response,
        resource: 'data'
      });
    })
    .catch(function (error) {
      return getAll.error({
        error: error,
        resource: ''
      });
    });
  },
  setRole (dargs) {

    /**
     * Update a user's permission
     */
    return blackAxios.post(this.resource.setPermission, {
      Id: dargs.Id,
      Permission: dargs.permission,
      State: dargs.state,
    },
    {
      'headers': { 'x-access-token': dargs.token }
    })
    .then(function (response) {

      return add.success({
        response: response,
        resource: ''
      });
    })
    .catch(function (error) {
      return add.error({
        error: error,
        defaultmsg: ''
      });
    });
  },

  getDeveloperTeam (dargs) {
    /**
     * Get dev analysis in this team
     */
    return blackAxios.get(this.resource.getDevTeam + dargs.id, {
        'headers': { 'x-access-token': dargs.token }
      })
    .then(function (response) {
      return getAll.success({
        response: response,
        resource: 'data'
      });
    })
    .catch(function (error) {
      return getAll.error({
        error: error,
        resource: ''
      });
    });
  },

  getStats (dargs) {
    /**
     * Get people active completed stats by team id
     */
    return blackAxios.get(this.resource.stats + dargs.id, {
        'headers': { 'x-access-token': dargs.token }
      })
    .then(function (response) {
      return getAll.success({
        response: response,
        resource: 'data'
      });
    })
    .catch(function (error) {
      return getAll.error({
        error: error,
        resource: ''
      });
    });
  },

  getTeamById (dargs) {
    /**
     * Get all the members of a client's team,
     * using the client's team id
     */
    return blackAxios.get(this.resource.byId + dargs.id, {
        'headers': { 'x-access-token': dargs.token }
      })
    .then(function (response) {
      return getAll.success({
        response: response,
        resource: ''
      });
    })
    .catch(function (error) {
      return getAll.error({
        error: error,
        resource: ''
      });
    });
  },

  getTeamByUserId (dargs) {
    /**
     * Get all the members of a client's team,
     * using the client's team id
     */
    //
    return blackAxios.get(this.resource.getTeamByUserId + dargs.Id, {
        'headers': { 'x-access-token': dargs.token }
      })
    .then(function (response) {
      //
      return getAll.success({
        response: response,
        resource: ''
      });
    })
    .catch(function (error) {
      //
      return getAll.error({
        error: error,
        resource: ''
      });
    });
  },


  getTeamProjects (dargs) {
    /**
     * Get all the projects for a particular client
     * using the client's team id
     */
    return blackAxios.get(this.resource.getTeamProjects + dargs.id, {
        'headers': { 'x-access-token': dargs.token }
      })
    .then(function (response) {
      return getAll.success({
        response: response,
        resource: 'data'
      });
    })
    .catch(function (error) {
      return getAll.error({
        error: error,
        resource: ''
      });
    });
  },

  getPendingInvites (dargs) {
    /**
     * Get all people that have been invited to join a team
     * but have not accepted
     */
    return blackAxios.get(this.resource.pendingInvites + dargs.id, {
        'headers': { 'x-access-token': dargs.token }
      })
    .then(function (response) {
      return getAll.success({
        response: response,
        resource: 'data'
      });
    })
    .catch(function (error) {
      return getAll.error({
        error: error,
        resource: ''
      });
    });
  },

  inviteUser (dargs) {

    /**
     * Invite a new user to join a team
     */
    return blackAxios.post(this.resource.inviteUser, {
      first_name: dargs.first_name,
      last_name: dargs.last_name,
      Email: dargs.Email,
      team_Id: dargs.team_Id,
      type: dargs.type,
    },
    {
      'headers': { 'x-access-token': dargs.token }
    })
    .then(function (response) {

      return add.success({
        response: response,
        resource: ''
      });
    })
    .catch(function (error) {
      return add.error({
        error: error,
        defaultmsg: ''
      });
    });
  },

  hireUser (dargs) {
    /**
     * Request for a user on zeedas to join a team
     */
    return blackAxios.post(this.resource.hireUser + dargs.userId, {
      team_id: dargs.team_id,
    },
    {
      'headers': { 'x-access-token': dargs.token }
    })
    .then(function (response) {
      return add.success({
        response: response,
        resource: ''
      });
    })
    .catch(function (error) {
      return add.error({
        error: error,
        defaultmsg: ''
      });
    });
  },

  confirmHire (dargs) {
    /**
     * Confirm a hire request
     */
    return blackAxios.get(this.resource.confirmHire + dargs.userId + '/' + dargs.teamId,
    {
      'headers': { 'x-access-token': dargs.token }
    })
    .then(function (response) {
      return add.success({
        response: response,
        resource: ''
      });
    })
    .catch(function (error) {
      return add.error({
        error: error,
        defaultmsg: ''
      });
    });
  },

  removeUser (dargs) {
    /**
     * Remove user from team
     */

    return blackAxios.get(this.resource.removeUser + dargs.id + "/" + dargs.developer_Id, {

      'headers': { 'x-access-token': dargs.token }
    })
      .then(function (response) {
        return gDelete.success({
          response: response,
          resource: ''
        });
      })
      .catch(function (error) {
        return gDelete.error({
          error: error,
          defaultmsg: 'Failed to remove user from team'
        });
      });
  },
deleteUser (dargs) {
    /**
     * Remove user from team
     */

    return blackAxios.get(this.resource.deleteUser + dargs.developer_Id, {

      'headers': { 'x-access-token': dargs.token }
    })
      .then(function (response) {
        return gDelete.success({
          response: response,
          resource: ''
        });
      })
      .catch(function (error) {
        return gDelete.error({
          error: error,
          defaultmsg: 'Failed to remove user from team'
        });
      });
  },

  suspendUser (dargs) {
    /**
     * Suspend user from team
     */
    return blackAxios.get(this.resource.suspendUser + dargs.id, {
      'headers': { 'x-access-token': dargs.token }
    })
      .then(function (response) {
        // debugger
        return gDelete.success({
          response: response,
          resource: ''
        });
      })
      .catch(function (error) {
        return gDelete.error({
          error: error,
          defaultmsg: 'Failed to suspend this user'
        });
      });
  },
  unsuspendUser (dargs) {
    /**
     * Suspend user from team
     */
    return blackAxios.get(this.resource.unsuspendUser + dargs.id, {
      'headers': { 'x-access-token': dargs.token }
    })
      .then(function (response) {
        // debugger
        return gDelete.success({
          response: response,
          resource: ''
        });
      })
      .catch(function (error) {
        return gDelete.error({
          error: error,
          defaultmsg: 'Failed to suspend this user'
        });
      });
  }
}
