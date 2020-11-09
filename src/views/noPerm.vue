<template>
  <div>
    <div class="app-container">
      <el-col :span="12">
        <img :src="img_404" alt="404" class="img-style">
      </el-col>
      <el-col :span="12">
        <div style="margin-left: 100px;margin-top: 60px">
          <h1 class="color-main">权限错误!</h1>
          <h2 style="color: #606266">很抱歉，你没有权限访问！</h2>
          <div style="color:#909399;font-size: 14px">请联系主管是否有权限，如果权限错误及时联系管理员开通！！</div>
          <el-button style="margin-top: 20px" type="primary" round @click="handleGoMain">返回上一页</el-button>
        </div>
      </el-col>
    </div>
  </div>
</template>

<script>
  import img_404 from 'assets/images/404.png';

  export default {
    name: 'error',
    data() {
      return {
        img_404
      }
    },
    methods: {
      handleGoMain() {
        this.$router.back()
      }
    },
  }
</script>

<style scoped>
  .app-container {
    width: 80%;
    margin: 120px auto;
  }

  .img-style {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
  }
</style>