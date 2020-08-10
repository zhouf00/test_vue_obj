<!-- 登陆界面 -->
<template>
  <div>
    <el-card class="login-form-layout">
      <el-form autoComplete="on"
               :model="loginForm"
               :rules="loginRules"
               ref="loginForm"
               label-position="left">
        <div style="text-align:center">
          <svg-icon icon-class="login-mall"></svg-icon>
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
    </el-card>
  </div>
</template>

<script>
  import {isvalidUsername} from '@/utils/validate'
  import {setSupport, getSupport, setCookie, getCookie} from 'utils/support'
  import {login, getUser} from 'network/api/login'

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
    methods:{
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if(valid){
            this.loading = true;
            this.$store.dispatch('Login', this.loginForm).then(() => {
              this.loading = false;
              setCookie("username", this.loginForm.username, 15);
              setCookie("password", this.loginForm.password, 15);
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