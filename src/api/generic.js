import { getErrMsg,
    postErrMsg,
    deleteErrMsg,
    idNotFound,
    authErrMsg,
    isAuthErr,
    isVerificationErr,
    calcItemsWorth,
    errorToObj,
    print,
    isPaymentRequired } from '@/helpers';

// Data Helpers

// API Helpers
export const getAll = {
    success (dargs) {
        const response = dargs.response;
        const resource = dargs.resource;
        const result = {};
        let data = '';

        // console.log(response.data.denied);
        print('Retrieval Completed: ', response);
        try {
            data = response.data[resource];
        } catch (e) {
            // Nada
        }

        if(response.data.denied){
          result.denied = true;
        }
        // Check for error in status for now
        if (response.data.status === false || response.data.success === false) {
            result.error = response.data.message;

            return result;
        }
        if (resource !== '') {
            data = response.data[resource];
        } else {
            data = response.data
        }
        if(response.data.more){
          result.more = response.data.more;
        }
        if(response.data.pages){
          result.pages = response.data.pages;
        }
        if(response.data.statistics){
          result.stats = response.data.statistics;
        }

        result.data = data;

        result.msg = response.msg;
        // this.$show_notification("Access Denied");
        if(response.data.denied){
           result.denied = true;
        }
        return result;
    },

    error (dargs) {
        const error = dargs.error;
        const resource = dargs.resource;
        const result = {};
        // let data;

        // Custom Status msgs by status code
        const errMsg = getErrMsg();

        if (error.response) {
          // The request was made, but the server responded with a status code
          // that falls out of the range of 2xx
          const statusCode = error.response.status;
          print(error.response, statusCode);

          result.unauthorized = isAuthErr(statusCode);
          result.verified = isVerificationErr(statusCode);
          result.error = getErrMsg(statusCode);
          result.data = error.response.data.err;
        } else {
          result.error = errMsg;
        }
        print(result, 'get all error')
        return result;
    }
}

export const getById = {
    success (dargs) {
        const response = dargs.response;
        const resource = dargs.resource;
        const result = {};
        let data;

        print('Retrieval Completed: ', response);

        // Check for error in status for now
        if (response.data.status === false || response.data.success === false) {
            result.error = response.data.message;

            return result;
        }
        if (resource !== '') {
            data = response.data[resource];
        } else {
            data = response.data
        }

        result.data = data;
        result.msg = response.msg;

        return result;
    },

    error (dargs) {
        const error = dargs.error;
        const resource = dargs.resource;
        const fullResponse = dargs.fullResponse;
        const defaultmsg = dargs.defaultmsg;
        const result = {};
        let data;

        // Custom Status msgs by status code
        const errMsg = defaultmsg || getErrMsg();
        print(error);

        if (error.response) {
          // The request was made, but the server responded with a status code
          // that falls out of the range of 2xx
          const statusCode = error.response.status;
          print(error.response.data.err, statusCode);

          result.notfound = idNotFound(statusCode);
          result.unauthorized = isAuthErr(statusCode);
          result.error = defaultmsg || getErrMsg(statusCode);
          if (!fullResponse) {
              result.data = error.response.data.err;
          } else {
              result.data = error.response.data;
          }
        } else {
          result.error = errMsg;
        }

        return result;
    }
}

export const add = {
    success (dargs) {
        const response = dargs.response;
        const resource = dargs.resource;
        const result = {};
        let data = response.data;

        print('Addition Completed: ', response);
        // Check for error in status for now
        if (response.data.status === false || response.data.success === false) {
            result.error = response.data.message;

            return result;
        }

        if (resource !== '') {
            data = response.data[resource];
        } else {
            data = response.data
        }

        result.data = data;
        result.msg = response.msg;

        return result;
    },

    error (dargs) {
        const error = dargs.error;
        const defmsg = dargs.defaultmsg;
        const hasServerError = !dargs.noServerErrorMsg;
        const hasPayError = dargs.allowPayErrorMsg;
        const hasForbiddenError = dargs.allowPayErrorMsg;
        const result = {};
        let data;
        let errMsg;

        if (!hasServerError) {
            errMsg = defmsg
        } else {
            errMsg = defmsg + ' ' + error.message;
        }
        let customEMsg;

        if (error.response) {
          // The request was made, but the server responded with a status code
          // that falls out of the range of 2xx
          const statusCode = error.response.status;
          print(error.response, error.response.status);

          // Custom Status msgs by status code
          customEMsg = postErrMsg(statusCode, error.message);
            if (!hasServerError) {
                errMsg = defmsg
            } else {
                errMsg = defmsg + ' ' + customEMsg;
            }

            // Structure field errors
            let errors;
            try {
                errors = errorToObj(error.response.data.err)
            } catch (TypeError) {
                // Do Nada
            }

          result.error = errMsg;
          result.data = errors;
          result.unauthorized = isAuthErr(statusCode);
          result.notfound = idNotFound(statusCode);
          result.paymentRequired = isPaymentRequired(statusCode);
          if (isPaymentRequired(statusCode)) {
            //   Get secapay link
              result.seclink = error.response.data.msg[1]
              result.offerDetails = error.response.data.msg[2]
          }
        } else {
          result.error = errMsg;
        }

        return result;
    }
}

export const edit = {
    success (dargs) {
        const response = dargs.response;
        const resource = dargs.resource;
        const result = {};
        let data = response.data;

        print('Edit Completed: ', response);

        // Check for error in status for now
        if (response.data.status === false || response.data.success === false) {
            result.error = response.data.message;

            return result;
        }

        if (resource !== '') {
            data = response.data[resource];
        } else {
            data = response.data
        }

        result.data = data;
        result.msg = response.msg;

        return result;
    },

    error (dargs) {
        const error = dargs.error;
        const defmsg = dargs.defaultmsg;
        const result = {};
        let data;

        let errMsg = defmsg + ' ' + error.message;
        let customEMsg;

        if (error.response) {
          // The request was made, but the server responded with a status code
          // that falls out of the range of 2xx
          const statusCode = error.response.status;
          print(error.response.data.err, error.response.status);

          // Custom Status msgs by status code
          customEMsg = postErrMsg(statusCode, error.message);
          errMsg = defmsg + ' ' + customEMsg;

            // Structure field errors
            let errors;
            try {
                errors = errorToObj(error.response.data.err)
            } catch (TypeError) {
                // Do Nada
            }

          result.error = errMsg;
          result.data = errors;
          result.unauthorized = isAuthErr(statusCode);
        } else {
          result.error = errMsg;
        }

        return result;
    }
}

export const gDelete = {
    success (dargs) {
        const response = dargs.response;
        const resource = dargs.resource;
        const result = {};
        let data = response.data;

        print('Deletion Completed: ', response);

        // Check for error in status for now
        if (response.data.status === false || response.data.success === false) {
            result.error = response.data.message;

            return result;
        }

        if (resource !== '') {
            data = response.data[resource];
        } else {
            data = response.data
        }

        result.data = data;
        result.msg = response.msg;

        return result;
    },

    error (dargs) {
        const error = dargs.error;
        const defmsg = dargs.defaultmsg;
        const hasServerError = !dargs.noServerErrorMsg;
        const result = {};
        let data;
        let errMsg

        if (!hasServerError) {
            errMsg = defmsg
        } else {
            errMsg = defmsg + ' ' + error.message;
        }
        let customEMsg;

        if (error.response) {
          // The request was made, but the server responded with a status code
          // that falls out of the range of 2xx
          const statusCode = error.response.status;
          print(error.response.data.err, error.response.status);

          // Custom Status msgs by status code
          customEMsg = deleteErrMsg(statusCode, error.message);

            if (!hasServerError) {
                errMsg = defmsg
            } else {
                errMsg = defmsg + ' ' + customEMsg;
            }

          result.error = errMsg;
          result.data = error.response.data.err;
          result.unauthorized = isAuthErr(statusCode);
        } else {
          result.error = errMsg;
        }

        return result;
    }
}
