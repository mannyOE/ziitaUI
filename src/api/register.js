import { blackAxios } from '@/config';
import { postErrMsg, print } from '@/helpers';

// const blackAxios = config.blackAxios

export default {
  res: 'signup',
  invite: 'singleInvite/',

  register (dargs) {
    return blackAxios.post(this.res, dargs)
      .then(function (response) {
        print(response);

        print('Registration Completed: ', response);
        let result = {
            data: response.data,
            msg: response.msg
        };

        // Setup to check for failure in status message for now
        if (response.data.status === false) {
          result.error = response.data.messasge;
          result.autherror = true;
        }

        return result;
      })
      .catch(function (error) {
        let result = {};
        let errMsg = 'Registration failed. ' + error.message;
        let customEMsg;

        if (error.response) {
          // The request was made, but the server responded with a status code
          // that falls out of the range of 2xx
          print(error.response.data, error.response.status);

          // Custom Status msgs by status code
          customEMsg = postErrMsg(error.response.status, error.message);
          errMsg = 'Registration failed. ' + customEMsg;

          print(errMsg);

          result = {
            error: errMsg,
            data: error.response.data
          };
        } else {
          result.error = errMsg;
        }

        return result;
      });
  },
  getInvited (dargs) {;
    debugger
    /**
     * Get dev analysis in this team
     */
    return blackAxios.get(this.invite + dargs.id)
    .then(function (response) {


      return response
    })
    .catch(function (error) {

     return error
    });
  },
}
