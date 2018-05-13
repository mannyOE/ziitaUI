import { blackAxios } from '../config';

export default {
  resource: {
    feedback: 'feedback',
    retrieve: 'notification/'
  },

  feedback (dargs) {
    return blackAxios.post(this.resource.feedback, {
      Name: dargs.name,
      Email: dargs.email,
      Feedback: dargs.feedback,
    }
    //     {
    //   'headers': { 'x-access-token': dargs.token }
    // }
)
      .then(function (response) {
        return response
      })
      .catch(function (error) {
        return error
      });
  },

  retrieve (dargs) {

    return blackAxios.get(this.resource.retrieve + dargs.Id
    //     {
    //   'headers': { 'x-access-token': dargs.token }
    // }
)
      .then(function (response) {
        return response
      })
      .catch(function (error) {
        return error
      });
  },
}