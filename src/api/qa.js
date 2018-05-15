import { blackAxios } from '../config';
import { getAll, getById, add, edit, gDelete } from './generic';

export default {
  resource: {
    tests: 'modules/qa/update/',
    mods: 'modules/qa/allMods/',
    refresh: 'user_permissions/',
    complete: 'modules/qa/complete',
    eaModule: 'modules/ea/allMods/',
    eaMethod: 'method/'
  },

  testCases (dargs) {
    /**
     * Get all skills on the platform
     */
    return blackAxios.post(this.resource.tests + dargs.Id,
      {test: dargs.test},
     {
        'headers': { 'x-access-token': dargs.token },
      }
    )
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
    methodTest (dargs) {
    /**
     * Get all skills on the platform
     */
    return blackAxios.post(this.resource.eaMethod + dargs.Id,
      {test: dargs.test},
     {
        'headers': { 'x-access-token': dargs.token },
      }
    )
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
  completeMod (dargs) {
    /**
     * Get all skills on the platform
     */
    return blackAxios.post(this.resource.complete,
      dargs,
     {
        'headers': { 'x-access-token': dargs.token },
      }
    )
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
  getMods (dargs) {
    /**
     * Get all skills on the platform
     */
    return blackAxios.get(this.resource.mods + dargs.projectId,
     {
        'headers': { 'x-access-token': dargs.token },
      }
    )
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
    getModuleMethods (dargs) {
    /**
     * Get all skills on the platform
     */
    return blackAxios.get(this.resource.eaModule + dargs.projectId,
     {
        'headers': { 'x-access-token': dargs.token },
      }
    )
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

  permsRefresh (dargs) {
    /**
     * Get all skills on the platform
     */
    return blackAxios.get(this.resource.refresh,
     {
        'headers': { 'x-access-token': dargs },
      }
    )
    .then(function (response) {
      console.log(response.data.dis_user);
      return response.data.dis_user
    });
  },
}
