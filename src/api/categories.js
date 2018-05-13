import { blackAxios } from '../config';
import { getAll, getById, add, edit, gDelete } from './generic';

export default {
  resource: {
    getAll: 'category/',
    create: 'category/',
    edit: 'update_category',
    deleteCategory: 'delete_category/',
    getMessage:"messaging"
  },

  getTeamCategories (dargs) {
    /**
     * Get all categories for a team
     * by team id
     */

    return blackAxios.get(this.resource.getAll + dargs.teamId, {
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
 getMessage (dargs) {
    /**
     * Get all categories for a team
     * by team id
     */
     //
      return blackAxios.get(this.resource.getMessage, {
      'headers': { 'x-access-token': dargs.token }
    })
      .then(function (response) {
        return add.success({
          response: response,
          resource: 'data'
        });
      })
      .catch(function (error) {
        return add.error({
          error: error,
          resource: ''
        });
      });
  },
  createCategory (dargs) {
    /**
     * Add new category to the team
     */
    return blackAxios.post(this.resource.create, {
      category_name: dargs.category_name,
      skills: dargs.skills,
      team_Id: dargs.teamId,
      Id:dargs.Id
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

  editCategory (dargs) {
    /**
     * edit category by id
     */
    return blackAxios.post(this.resource.edit, {
      category_name: dargs.category_name,
      skills: dargs.skills,
      Id: dargs.Id,
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

  deleteCategory (dargs) {
    /**
     * delete category
     */
    return blackAxios.get(this.resource.deleteCategory + dargs.id, {
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
}
