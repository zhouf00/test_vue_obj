import {formatDate} from 'utils/date'

export default {
  filters: {
    formatDateTime(time) {
      if (time == null || time === '') {
        return 'N/A'
      }
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd')
    }
  },
}