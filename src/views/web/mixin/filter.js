import {formatDate} from 'utils/date'

export default {
  filters: {
    formatDateTime(time, fmt=null) {
      if (time == null || time === '') {
        return 'N/A'
      }
      let date = new Date(time);
      if (fmt) {
        return formatDate(date, `yyyy-MM-dd ${fmt}`)
      } else {
        return formatDate(date, `yyyy-MM-dd`)
      }
    }
  },
}