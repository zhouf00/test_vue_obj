<!--  -->
<template>
  <div>
    <wxlogin
      :appid="appid"
      :agentid="agentid"
      :redirect_uri="redirect_uri"
      ></wxlogin>
  </div>
</template>

<script>
  import wxlogin from './components/wxLogin'
  import {auth2} from 'network/api/auth2'

  export default {
    name: 'auth',
    components: {
      wxlogin
    },
    mounted() {
      this.isWxwork()
      if (this.isWenxin) {
        this.getCodeWx()
        // this.test = 'wxwork is true'
        console.log('wxwork is true');
      } else {
        this.getCode()
        // this.test = 'wxwork is false'
        console.log('wxwork is false');
      }
    },
    data() {
      return {
        resCode: null,
        appid:'wwa84b8b2c3e83d6e0',
        agentid:'1000007',
        redirect_uri:'http%3A%2F%2Ftest.windit.com.cn/login',
        isWenxin: null
      }
    },
    methods: {
      // 扫码登陆
      getCode() {
        this.resCode = this.$route.query.code
        this.loading = true
        if (this.resCode) {
          this.$store.dispatch('Auth2', this.resCode).then(response => {
            // console.log('所有',response)
            this.loading = false
            if (response.err) {
              // console.log('返回',response.err)
              this.$message({
                type: 'warning',
                message: response.err.msg ? response.err.msg : '连接有误'
              })
            } else {
              this.$router.push({path:'/'})
            }
          }).catch(error => {
            // console.log(error)
            this.loading = false
            this.$message({
              type: 'warning',
              message: error
            })
          })
        }
      },
      // 企业微信登陆
      getCodeWx() {
        let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.appid}&redirect_uri=${this.redirect_uri}&response_type=code&scope=${this.agentid}&state=STATE#wechat_redirect`
        this.resCode = this.$route.query.code
        this.loading = true
        if (this.resCode) {
          this.$store.dispatch('Auth2', this.resCode).then(response => {
            this.loading = false
            if (response.err) {
              this.$message({
                type: 'warning',
                message: response.err.msg ? response.err.msg : '连接有误'
              })
            } else {
              this.$router.push({path:'/'})
            }
          }).catch(error => {
            this.loading = false
            this.$message({
              type: 'warning',
              message: error
            })
          })
        } else {
          // 打开外链地址
          window.location.href = url
        }
      },
      isWxwork() {
        let Agent = navigator.userAgent;
        this.testData = Agent
        // this.isWenxin = true
        if (Agent.indexOf('wxwork') > -1){
          this.isWenxin = true
        } else {
          this.isWenxin = false
        }
      }
    }
  }
</script>

<style scoped>
  
</style>