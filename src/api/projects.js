import { blackAxios } from '../config';
import { getAll, getById, add, edit, gDelete } from './generic';

export default {
  endPoints: {
      getEvents:'company/getEvents/',
      setEvents:'company/setEvents/',
      getNotes:'company/getNotes/',
      setNotes:'company/setNotes/',
      getClients:'company/getClients/',
      setClients:'company/setClients/',
  },

  uploadFile (dargs){
    // console.log(dargs.image);
    return blackAxios.post(this.endPoints.sendFile, dargs.image,
    {
      'headers': { 'x-access-token': dargs.token, team: dargs.user.team_Id, project: dargs.project }
    })
      .then(function (response) {
        return add.success({
          response: response,
          endPoints: ''
        });
      })
      .catch(function (error) {
        return add.error({
          error: error,
          defaultmsg: ''
        });
      });
  },

  getClients (dargs) {
    /**
     * Get dev analysis in this project
     */

    return blackAxios.get(this.endPoints.getClients + dargs.id, {
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

  getProjectOverview (dargs) {
    /**
     * Get project by id
     */
    return blackAxios.get(this.endPoints.getOverview + dargs.projectId, {
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

  getProjectById (dargs) {
    /**
     * Get project by id
     */
    return blackAxios.get(this.endPoints.getProject + dargs.projectId, {
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


  addDeveloper (dargs) {
    /**
     * Add developers to team
     */
    return blackAxios.post(this.endPoints.addDevelopers + dargs.projectId, {
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

  createProject (dargs) {
    /**
     * Create a new project
     */
    return blackAxios.post(this.endPoints.create, {
      project_name: dargs.project_name,
      project_description: dargs.project_description,
      company_Id: dargs.company_Id, // This is team id
      manager_Id: dargs.manager_Id, // project manager id
      platform: dargs.platform, // {type:String, default:1} web:1, mobile:2, other:3
       team: dargs.team, // ???s
      platform_name: dargs.platform_name, // web, mobile or other
      // token: dargs.token,
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
          defaultmsg: 'Failed to create project'
        });
      });
  },


  updateProject (dargs) {
    /**
     * Create a new project
     */
    return blackAxios.post(this.endPoints.updateProject + dargs.id, {
      Id: dargs.Id,
      url:dargs.url,
      username: dargs.username,
      password: dargs.password,
      name: dargs.project_name
    }, {
        'headers': { 'x-access-token': dargs.token }
      },
    )
      .then(function (response) {
        return add.success({
          response: response,
          resource: ''
        });
      })
      .catch(function (error) {
        return add.error({
          error: error,
          defaultmsg: 'Failed to update project'
        });
      });
  },

}
