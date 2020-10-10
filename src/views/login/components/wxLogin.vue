<!--  -->
<template>
  <iframe scrolling="no" width="300" height="400" frameBorder="0" allowTransparency="true" :src="setSrc"></iframe>
</template>

<script>
  export default {
    name: 'wxLogin',
    props: {
      appid: String,
      agentid: String,
      redirect_uri: String,
      state: {
        type: String,
        default:'STATE'
      },
      href: {
        type:String,
        default: ''
      },
    },
    computed: {
      setSrc() {
        let _url = 'https://open.work.weixin.qq.com/wwopen/sso/qrConnect?appid=' + this.appid
        + '&agentid=' + this.agentid
        + '&redirect_uri=' + this.redirect_uri
        + '&state=' + this.state
        return _url
      }
    }
    
  }
</script>

<style scoped>
  
</style>