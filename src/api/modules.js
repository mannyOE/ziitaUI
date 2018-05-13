import { blackAxios } from '../config';
import { getAll, getById, add, edit, gDelete } from './generic';

export default {
  resource: {
    getModules: 'modules/',
    getModulesByStatus: 'modules/pm/',
    create: 'create_module',
    delete: 'delete/m/',
    assignToDev: 'assign/',
    accept: 'module/accept/',
    reject: 'module/reject/',
    folder: 'project/repository_folder',
       get_link:'terminal/get_link/',
  },

  getModules (dargs) {
    /**
     * Get all modules in a project
     */

    return blackAxios.get(this.resource.getModules + dargs.projectId, {
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

  getTestUrl (dargs) {
    /**
     * Get trst url
      by id
     */
    return blackAxios.get(this.resource.get_link + dargs.id, {
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

  getRepository(dargs) {
    /**
     * Get all modules in a project
     */
    return blackAxios.post(this.resource.folder+"/"+dargs.projectId, dargs, {
      'headers': { 'x-access-token': dargs.token }
    })
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return getAll.error({
          error: error,
          resource: ''
        });
      });
  },



  getModulesByStatus (dargs) {
    /**
     * Get module by module status, project manager id and project id
     *  => modules/pm/{{status}}/{{ID}}/{{PJ}
     * status => Submited:2, inprogress:3, completed:3, rejected:4
     */
    return blackAxios.get(this.resource.getModulesByStatus + dargs.status + '/' + dargs.projectId, {
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

  rejectModule (dargs) {
    /**
     * Reject a module by module id
     * For project manager
     */

    return blackAxios.post(this.resource.reject + dargs.module_Id,dargs, {
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
          resource: ''
        });
      });
  },

  acceptModule (dargs) {
    /**
     * Accept a module by module id
     * For project manager
     */

    return blackAxios.post(this.resource.accept + dargs.module_Id,dargs, {
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
          resource: ''
        });
      });
  },

  deleteModule (dargs) {
    /**
     * delete a module by module id
     * For ??
     */
    return blackAxios.get(this.resource.delete + dargs.id, {
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
          resource: ''
        });
      });
  },

  assignModuleToDeveloper (dargs) {
    /**
     * Assign a module to a developer with module id as route param
     * and developer id in body
     */
    return blackAxios.post(this.resource.assignToDev + dargs.moduleId, {
      Id: dargs.developerId, // developer id
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

  createModule (dargs) {
    /**
     * Create a new module
     * For project manager ??
     */
     //
    return blackAxios.post(this.resource.create, dargs,
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
