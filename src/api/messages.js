import { blackAxios } from '../config';
import { getAll, getById, add, edit, gDelete } from './generic';

export default {
  resource: {
    all: 'project/Team/',
    send: 'project_overview/',
    markRead: 'project_details/',
  },

  getAll (dargs) {
    /**
     * Get all messages for active user
     * for a particular sender
     */
    return blackAxios.get(this.resource.all + dargs.id, {
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

  sendMessage (dargs) {
    /**
     * send message with from active user
     * to other user
     */
    return blackAxios.post(this.resource.send + dargs.projectId, {
      Id: dargs.developerId,
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

  markRead (dargs) {
    /**
     * Mark all messages as read
     */
    return blackAxios.post(this.resource.markRead + dargs.projectId, {
      Id: dargs.developerId,
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
}
