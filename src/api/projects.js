import { blackAxios } from '../config';
import { getAll, getById, add, edit, gDelete } from './generic';

export default {
  resource: {
    getTeam: 'project/Team/',
    getProject: 'project_details/',
    getOverview: 'project_overview/',
    create: 'create_project',
    updateProject: 'update_project/',
    deleteProject: 'delete/p/',
    addDevelopers: '/add_to_team/',
    setDefaultDocker: 'update_docker_project/',
    updateSsh: 'update_ssh_project/',
    getDocker: 'docker_list/',
    getConfigTest:'terminal/test_ssh/',
    createDocker: 'create_docker',
    removeDocker: 'remove_docker',
    getDeveloperByTeam:'',
    getTestLink:"terminal/get_link/",
    getGitUrlTest: "terminal/test_git_url",
    devDetail: {
      p: 'projects/',
      d: '/developers/',
    },
    timeline: 'timeline/',
  },

  getTimeline (dargs) {
    /**
     * Get timeline for a project
     */
    return blackAxios.get(this.resource.timeline + dargs.id, {
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
  getDeveloper (dargs) {
    /**
     * Get dev analysis in this project
     */
    
    return blackAxios.get(this.resource.devDetail.p + dargs.projectId + this.resource.devDetail.d + dargs.id, {
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
    return blackAxios.get(this.resource.getOverview + dargs.projectId, {
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
    return blackAxios.get(this.resource.getProject + dargs.projectId, {
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

  getTeamByProjectId (dargs) {
    /**
     * Get all the members of a project by project id,
     * developers and project manager
     */
    return blackAxios.get(this.resource.getTeam + dargs.id, {
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
  getDeveloperByTeam (dargs) {
    /**
     * Get all the members of a project by project id,
     * developers and project manager
     */
    return blackAxios.get(this.resource.getDeveloperByTeam + dargs.id, {
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
    return blackAxios.post(this.resource.addDevelopers + dargs.projectId, {
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
    return blackAxios.post(this.resource.create, {
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



  createDocker (dargs) {
    /**
     * Create a new docker
     */
    return blackAxios.post(this.resource.createDocker, {
      Id: dargs.Id,
      name: dargs.name,
      content: dargs.content,
      team_Id: dargs.team_Id,
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
          defaultmsg: 'Failed to create docker'
        });
      });
  },
   updateDocker (dargs) {
    /**
     * Create a new docker
     */
    return blackAxios.post(this.resource.createDocker, {
      name: dargs.name,
      content: dargs.content,
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
          defaultmsg: 'Failed to update docker'
        });
      });
  },
  testConfig (dargs) {
    /**
     * Create a new docker
     */
     
    return blackAxios.post(this.resource.getConfigTest, {
      ssh_username: dargs.ssh_username,
      ssh_password: dargs.ssh_password,
      ssh_address: dargs.ssh_address,
      ssh_privatekey: dargs.ssh_privatekey,
      ssh_passphrase: dargs.ssh_passphrase,
      ssh_port: dargs.ssh_port,
      project_port: dargs.ssh_project_port
     
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
          response: error,
          defaultmsg: 'Failed to create docker'
        });
      });
  },
  testGitUrl (dargs) {
    /**
     * Create a new docker
     */
     
    return blackAxios.post(this.resource.getGitUrlTest, {
      username: dargs.username,
      password: dargs.password,
      url: dargs.url,

     
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
          response: error,
          defaultmsg: 'Failed to create docker'
        });
      });
  },

  updateProject (dargs) {
    /**
     * Create a new project
     */
    return blackAxios.post(this.resource.updateProject + dargs.id, {
      Id: dargs.Id,
      url:dargs.url,
      username: dargs.username,
      password: dargs.password,
      name: dargs.project_name
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

  getDocker (dargs) {
    /**
     * Create a new project
     */
    return blackAxios.get(this.resource.getDocker+dargs.team_Id
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

  setDefaultDocker (dargs) {
    
    /**
     * Update a docker file
     */
    return blackAxios.post(this.resource.setDefaultDocker, {
      projectId: dargs.projectId,
      id: dargs.Id
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
          defaultmsg: 'Failed to update docker'
        });
      });
  },

  removeDocker (dargs) {
    
    /**
     * Remove a docker file
     */
    return blackAxios.post(this.resource.removeDocker, {
      team_Id: dargs.team_Id,
      Id: dargs.Id
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
          defaultmsg: 'Failed to update docker'
        });
      });
  },

  getSsh (dargs) {
    /**
     * Create a new project
     */
    return blackAxios.get(this.resource.sshDetails
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

  updateSsh (dargs) {
    /**
     * Create a new project
     */
    return blackAxios.post(this.resource.updateSsh + dargs.Id, {
      ssh_username:dargs.ssh_username,
      ssh_password: dargs.ssh_password,
      ssh_port: dargs.ssh_port,
      ssh_address: dargs.ssh_address,
      ssh_passphrase:dargs.ssh_passphrase,
      ssh_privatekey:dargs.ssh_privatekey,
      project_port:dargs.ssh_project_port
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
          defaultmsg: 'Failed to update docker'
        });
      });
  },

  deleteProject (dargs) {
    /**
     * Delete project with project id
     */
    return blackAxios.get(this.resource.deleteProject + dargs.id, {
      'headers': { 'x-access-token': dargs.token,
        'Content-Type': 'application/x-www-form-urlencoded' },
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
          defaultmsg: 'failed to delete this project',
          noServerErrorMsg: true
        });
      });
  }
}
