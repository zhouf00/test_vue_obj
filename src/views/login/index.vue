<!-- 登陆界面 -->
<template>
  <div>
    <el-card class="login-form-layout">
      <el-form autoComplete="on"
               :model="loginForm"
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
                    :type="pwdType"></el-input>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data() {
      return {
        loginForm:{
          username: '',
          password: ''
        },
        pwdType: 'password'
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