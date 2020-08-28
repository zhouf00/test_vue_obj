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
      <el-form v-if="isActive" autoComplete="on"
               :model="loginForm"
               :rules="loginRules"
               ref="loginForm"
               label-position="left">
        <div style="text-align:center">
          
        </div>
        <el-form-item prop="username">
          <el-input name="username"
                    type="text"
                    v-model="loginForm.username"
                    autoComplete="on"
                    placeholder="请输入用户名">
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input name="password" 
                    :type="pwdType"
                    v-model="loginForm.password"
                    autoCompete="on"
                    placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom:60px;text-align:center">
          <el-button style="width:45%" type="primary" :loading="loading" @click="handleLogin">
            登录
          </el-button>
        </el-form-item>
      </el-form>
      <div v-if="!isActive">
        <iframe :src="url"
          scrolling="no" width="300" height="400" frameBorder="0" allowTransparency="true" ></iframe>
      </div>
    </el-card>
  </div>
</template>

<script>
  import {isvalidUsername} from '@/utils/validate'
  import {setSupport, getSupport, setCookie, getCookie} from 'utils/support'

  export default {
    name: 'index',
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!isvalidUsername(value)){
          callback(new Error('请输入正确的用户名'))
        } else {
          callback()
        }
      };
      const validatePasswd = (rule, value, callback) => {
        if (value.length < 3) {
          callback(new Error('密码不能小于6'))
        } else {
          callback()
        }
      }
      return {
        loginForm:{
          username: '',
          password: ''
        },
        // 用户名规则与密码规则
        loginRules: {
          username: [{required: true, trigger: 'blur', validator: validateUsername}],
          password: [{required: true, trigger: 'blur', validator: validatePasswd}]
        },
        loading: false,
        pwdType: 'password',
        mode_scan:'扫码登陆',
        mode_input:'帐号密码',
        mode_status: true,
        url:'https://open.work.weixin.qq.com/wwopen/sso/qrConnect?appid=wwa84b8b2c3e83d6e0&agentid=1000007&redirect_uri=http%3A%2F%2Ftest.windit.com.cn/profile&state=STATE'
      }
    },
    created() {
      this.loginForm.username = getCookie('username')
      this.loginForm.password = getCookie('password')
      if (this.loginForm.username === undefined || this.loginForm.username== null || this.loginForm.username === ''){
        this.loginForm.username = 'admin'
      }
      if(this.loginForm.password === undefined || this.loginForm.password == null){
        this.loginForm.password = ''
      }
    },
    computed:{
      isActive() {
        return this.mode_status
      },
      _isMobile() {
        let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
        return flag;
      }
    },
    methods:{
      itemClick(active) {
        if (active === this.mode_scan){
          this.mode_status = false
        } else {
          this.mode_status = true
        }
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if(valid){
            this.loading = true;
            this.$store.dispatch('Login', this.loginForm).then(() => {
              this.loading = false;
              setCookie("username", this.loginForm.username, 15);
              setCookie("password", this.loginForm.password, 15);
              this.$store.dispatch('SetIsMobile')
              this.$router.push({path:'/'})
              
            }).catch(error => {
              this.loading = false
              console.log(error)
            })
          }else{
            console.log('参数验证不合法');
            return false
          }
        })
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