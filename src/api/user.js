import { blackAxios } from '@/config';
import { authErrMsg, isAuthErr, isBadReq, isVerificationErr, print } from '@/helpers';
import { getAll, getById, add, edit, gDelete } from './generic';

// const blackAxios = config.blackAxios

export default {
  resource: {
    user: 'session',
    unhired: 'hireables/',
    uploadPicture: 'image_upload/',
    updateProfile: 'update_profile/',
    updatePassword: 'update_password',
  },

  getUnhired (dargs) {
    /**
     * Retrieve all devs and pms on zeedas without team
     */
    return blackAxios.get(this.resource.unhired, {
        'headers': { 
          'x-access-token': dargs.token,
        }
      })
    .then(function (response) {
      return getById.success({
        response: response,
        resource: 'data',
      });
    })
    .catch(function (error) {
      return getById.error({
        error: error,
        defaultmsg: ''
      });
    });
  },

  getUser (dargs) {
    /**
     * Retrieve authenticated user object
     */
    return blackAxios.get(this.resource.user, {
        'headers': { 
          'x-access-token': dargs.token,
        }
      })
    .then(function (response) {
      return getById.success({
        response: response,
        resource: 0, // Resource is the first element of array
      });
    })
    .catch(function (error) {
      return getById.error({
        error: error,
        defaultmsg: ''
      });
    });
  },

  uploadPicture (dargs) {
    /**
     * Upload profile picture
     */
    return blackAxios.post(this.resource.uploadPicture, dargs.image,
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

  updatePassword (dargs) {
    /**
     * Update user password
     */
    return blackAxios.post(this.resource.updatePassword, {
      Id: dargs.Id, // user id
      password: dargs.password, // user current password
      new_password: dargs.new_password, // new password
    },
    {
      'headers': { 'x-access-token': dargs.token }
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return add.error({
        error: error,
        defaultmsg: ''
      });
    });
  },

  updateProfile (dargs) {
    /**
     * Update user profile
     * only with fields to be updated
     */
    return blackAxios.post(this.resource.updateProfile, {
      first_name: dargs.first_name,
      last_name: dargs.last_name,
      Email: dargs.Email,
      team_name: dargs.team_name,
      phone: dargs.phone,
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
