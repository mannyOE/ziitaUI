import { blackAxios } from '@/config';
import { authErrMsg, isAuthErr, isBadReq, isVerificationErr, print } from '@/helpers';
import { getById } from './generic';

// const blackAxios = config.blackAxios

export default {
  resource: {
    res: 'login',
    confirmPassword: 'confirm_password',
    resend_confirmation: 'resend_confirmation',
    confirm_email: 'confirm_email',
    resUser: 'session',
  },


  login (dargs) {
    return blackAxios.post(this.resource.res, {
        Email: dargs.Email,
        Password: dargs.Password,
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        let result = {};
        let errMsg = 'Login failed. ' + error.message;
        let customEMsg;

        if (error.response) {
          // The request was made, but the server responded with a status code
          // that falls out of the range of 2xx
          let statusCode = error.response.status;
          print(error.response.data, statusCode);

          // Custom Status msgs by status code
          customEMsg = authErrMsg(statusCode, error.message);
          errMsg = 'Login failed. ' + customEMsg;

          result.autherror = isBadReq(statusCode);
          result.error = errMsg;
          result.data = error.response.data;
        } else {
          result.error = errMsg;
        }

        return result;
      });
  },

  forgotPassword(dargs){
    return blackAxios.post('/recover_password', dargs)
    .then(function (response) {

      print('Sent Email Details: ', response);



      return response;
    })
    .catch(function (error) {
      let results = {};
      let errMsg = 'Recover Password failed. ' + error.message;
      let customEMsg;

      if (error.response) {
        // The request was made, but the server responded with a status code
        // that falls out of the range of 2xx
        let statusCode = error.response.status;
        print(error.response.data, statusCode);

        // Custom Status msgs by status code
        customEMsg = authErrMsg(statusCode, error.message);
        errMsg = 'sending email failed. ' + customEMsg;

        results.autherror = isBadReq(statusCode);
        results.message = errMsg;
        results.status = false;
      } else {
        results.message = errMsg;
      }

      return results;
  })
},

confirmPassword (dargs) {
  /**
   * Retrieve all devs and pms on zeedas without team
   */

  return blackAxios.post(this.resource.confirmPassword, dargs)
  .then(function (response) {

    return getById.success({
      response: response,
      resource: '',
    });
  })
  .catch(function (error) {
    return getById.error({
      error: error,
      defaultmsg: ''
    });
  });
},
resend_confirmation (dargs) {
  /**
   * Retrieve all devs and pms on zeedas without team
   */
  return blackAxios.post(this.resource.resend_confirmation, dargs)
  .then(function (response) {
    return getById.success({
      response: response,
      resource: '',
    });
  })
  .catch(function (error) {
    return getById.error({
      error: error,
      defaultmsg: ''
    });
  });
},
confirm_email (dargs) {
  /**
   * Retrieve all devs and pms on zeedas without team
   */
  return blackAxios.post(this.resource.confirm_email, dargs)
  .then(function (response) {
    return getById.success({
      response: response,
      resource: '',
    });
  })
  .catch(function (error) {
    return getById.error({
      error: error,
      defaultmsg: ''
    });
  });
},


}
