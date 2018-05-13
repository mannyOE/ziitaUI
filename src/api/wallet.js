import { blackAxios } from '../config';
import { getAll, getById, add, edit, gDelete } from './generic';

export default {
  resource: {
    wallet: 'wallet/',
    getCard: 'getCard/',
    addCard: 'addCard',
    deleteCard: 'deleteCard/',
    getTransactions: 'Transactions/',
    fundWallet: 'fund_wallet/',
  },

  getWallet (dargs) {
    /**
     * Get wallet balance by user id
     */
    return blackAxios.get(this.resource.wallet + dargs.userId, {
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


  getCards (dargs) {
    /**
     * Get cards by user id
     */
    return blackAxios.get(this.resource.getCard + dargs.userId, {
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

  deleteCard (dargs) {
    /**
     * delete a card by card number
     */
    return blackAxios.get(this.resource.deleteCard + dargs.cardNo, {
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

  getTransactions (dargs) {
    /**
     * get transactions by user id
     */
    return blackAxios.get(this.resource.getTransactions + dargs.userId, {
      'headers': { 'x-access-token': dargs.token }
    })
      .then(function (response) {
        return gDelete.success({
          response: response,
          resource: 'data'
        });
      })
      .catch(function (error) {
        return gDelete.error({
          error: error,
          resource: ''
        });
      });
  },

  fundWallet (dargs) {
    /**
     * fund wallet by user id
     */
    return blackAxios.post(this.resource.fundWallet, {
      amount: dargs.amount,
      // type: dargs.type,
      card: dargs.cardNo,
      Id: dargs.Id, // user id
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

  addCard (dargs) {
    /**
     * add a card by user id
     */
    return blackAxios.post(this.resource.addCard, {
      name: dargs.name,
      no: dargs.no,
      year: dargs.year,
      month: dargs.month,
      cvv: dargs.cvv,
      Id: dargs.Id, // user id
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
