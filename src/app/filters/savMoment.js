/**
 *
 * Uses momentjs unix format
 *
 * @param {String} unix timestamp
 */
import moment from 'moment'

function savageMoment (value, type, dateformat) {
    const format = {
        sameDay: '[Today]',
        nextDay: '[Tomorrow]',
        nextWeek: 'dddd',
        lastDay: '[Yesterday]',
        lastWeek: '[Last] dddd',
        sameElse: dateformat || 'Do MMMM YYYY, h:mm a'
    }
    if (value) {
      return moment(value).calendar(null, format)
    }
  }

export default savageMoment
