import { blackAxios } from '../config';
import { getAll, getById, add, edit, gDelete } from './generic';

export default {
  resource: {
    getAll: 'skills',
  },

  getAll (dargs) {
    /**
     * Get all skills on the platform
     */
    return blackAxios.get(this.resource.getAll, {
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
}
