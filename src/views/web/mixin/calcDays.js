export default {
  computed: {
    calcDays() {
      return (row, date) => {
        let evolve = row.hit_rate
        let days = Math.floor((new Date()-new Date(`${date}+0800`))/(3600*1000*24))
        if( evolve === 1 ) {
          return {days:row.totalDays, color:null}
        } else if (evolve == 0.75 || evolve === 0.5){
          if (15 <= days && days < 30) {
            return {days, color:'color:#E6A23C'}
          } else if (Number(days) >= 30) {
            return {days, color:'color:red'}
          } else {
            return {days, color:null}
          }
        } else {
          return {days, color:null}
        }   
      }
    }
 }
}