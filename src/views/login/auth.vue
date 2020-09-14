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
    props:{
      isWxwork:{
        type: Boolean,
        default: false
      }
    },
    created() {
      if (this.isWxwork) {
        this.getCodeWx()
        console.log('wxwork is true');
      } else {
        this.getCode()
      }
    },
    data() {
      return {
        resCode: null,
        appid:'wwa84b8b2c3e83d6e0',
        agentid:'1000007',
        redirect_uri:'http%3A%2F%2Ftest.windit.com.cn/login',
        test: null
      }
    },
    methods: {
      // 扫码登陆
      getCode() {
        this.resCode = this.$route.query.code
        this.loading = true
        if (this.resCode) {
          this.$store.dispatch('Auth2', this.resCode).then(() => {
            this.loading = false
            this.$router.push({path:'/'})
          }).catch(error => {
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
          this.$store.dispatch('Auth2', this.resCode).then(() => {
            this.loading = false
            this.$router.push({path:'/'})
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
      }
    }
  }
</script>

<style scoped>
  
</style>