import {formatDate} from 'utils/date'

export default {
  filters: {
    formatDateTime(time, fmt=null) {
      if (time == null || time === '') {
        return 'N/A'
      }
      // 在时间后加上时区，防止浏览器识别时错加上8小时
      let date = new Date(`${time}+0800`);
      if (fmt) {
        return formatDate(date, `yyyy-MM-dd ${fmt}`)
      } else {
        return formatDate(date, `yyyy-MM-dd`)
      }
    }
  },
}