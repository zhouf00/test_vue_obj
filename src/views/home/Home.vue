<!-- 首页 -->
<template>
  <div>
    <el-container>
      <el-header>Header</el-header>
      <el-main class="active">Main</el-main>
      <el-main class="">Main</el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'Home',
  }
</script>
<style scoped>
    .el-header, .el-footer {
      background-color: #409EFF;
      color: #fff;
      text-align: center;
      line-height: 60px;
      /* font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif; */
    }
    .el-main{
      color: greenyellow;
    }
    .active {
      color: red;
    }
</style>