<!-- 登陆界面 -->
<template>
  <div>
    <el-card class="login-form-layout">
      <div slot="header">
        <span :style="isActive"
          @click="itemClick(mode_scan)">{{mode_scan}}</span>
        <span :style="'float: right;'+ isActive" 
          @click="itemClick(mode_input)">{{mode_input}}</span>
      </div>
      <!-- 帐号密码登陆 -->
      <register v-if="isActive"/>
      <!-- 扫码登陆 -->
      <auth v-if="!isActive" :isWxwork="isWenxin"/>
    </el-card>
  </div>
</template>

<script>
  import register from './register'
  import auth from './auth'

  export default {
    name: 'index',
    components: {
      register,
      auth
    },
    mounted(){
      this.isWxwork()
    },
    data() {
      return {
        mode_scan:'扫码登陆',
        mode_input:'帐号密码',
        mode_status: false,
        isWenxin: null
      }
    },
    computed:{
      isActive() {
        return this.mode_status
      },
      // _isMobile() {
      //   let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      //   return flag;
      // },
      // device() {
      //   return this.$store.state.apps.device
      // }
    },
    methods:{
      itemClick(active) {
        if (active === this.mode_scan){
          this.mode_status = false
        } else {
          this.mode_status = true
        }
      },
      isWxwork() {
        let Agent = navigator.userAgent;
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
    .login-form-layout {
    position: absolute;
    left: 0;
    right: 0;
    width: 360px;
    margin: 140px auto;
    border-top: 10px solid #409EFF;
  }
</style>