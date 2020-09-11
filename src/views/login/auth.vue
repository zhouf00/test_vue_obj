<!--  -->
<template>
  <wxlogin
    :appid="'wwa84b8b2c3e83d6e0'"
    :agentid="'1000007'"
    :redirect_uri="'http%3A%2F%2Ftest.windit.com.cn/login'"
    ></wxlogin>
</template>

<script>
  import wxlogin from './components/wxLogin'

  import {auth2} from 'network/api/auth2'

  export default {
    name: 'auth',
    components: {
      wxlogin
    },
    created() {
      this.getCode()
    },
    data() {
      return {
        resCode: null
      }
    },
    methods: {
      getCode() {
        this.resCode = this.$route.query.code
        auth2(this.resCode).then(response => {
            console.log(response)
          })
        if (this.resCode){
          console.log('有数据1')
          auth2(this.resCode).then(response => {
            console.log(response)
          })
        }else {
          console.log('无数据')
        }
      }
    }
  }
</script>

<style scoped>
  
</style>