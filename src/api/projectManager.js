import { blackAxios } from '../config';
import { getAll, getById, add, edit, gDelete } from './generic';

export default {
  resource: {
    getProjects: 'projects/pm/',
    assignProject: 'Assign/p/',
  },

  getProjects (dargs) {
    /**
     * Get all project manager's projects, with project manager's id
     */
    return blackAxios.get(this.resource.getProjects + dargs.id, {
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

  assignProject (dargs) {
    /**
     * Assigns a project to a project manager 
     * with project manager(pm) id in the post body
     * and project id as the url parameter
     */
    return blackAxios.post(this.resource.assignProject + dargs.projectId, {
      Id: dargs.pmId,
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
        defaultmsg: 'Failed to assign project'
      });
    });
  },
}
