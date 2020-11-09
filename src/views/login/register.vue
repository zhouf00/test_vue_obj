<!--  -->
<template>
  <el-form  autoComplete="on"
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
</template>

<script>
  import {isvalidUsername} from '@/utils/validate'
  import {setSupport, getSupport, setCookie, getCookie} from 'utils/support'

  export default {
    name: 'register',
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
        pwdType: 'password',        
        loading: false,
        loginForm:{
          username: '',
          password: ''
        },
        // 用户名规则与密码规则
        loginRules: {
          username: [{required: true, trigger: 'blur', validator: validateUsername}],
          password: [{required: true, trigger: 'blur', validator: validatePasswd}]
        },
      }
    },
    methods: {
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if(valid){
            this.loading = true;
            this.$store.dispatch('Login', this.loginForm).then(data => {
              // 判断
              // if(! Array.isArray(data) && ! (Object.prototype.toString.call(data) === '[object Object]')){
              //   this.loading = false;
              //   this.$message({
              //     type: 'warning',
              //     message: '连接有误',
              //   })
              // }
              if (data.err) {
                this.loading = false;
                this.$message({
                  type: 'warning',
                  message: data.err.msg ? data.err.msg : '连接有误'
                })
              } else {
                this.loading = false;
                setCookie("username", this.loginForm.username, 15);
                setCookie("password", this.loginForm.password, 15);
                this.$router.push({path:'/'}).catch(()=>{})   
              }
            }).catch(error => {
              this.loading = false
              this.$message({
                type: 'warning',
                message: '服务器连接有误'
              })
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
  
</style>