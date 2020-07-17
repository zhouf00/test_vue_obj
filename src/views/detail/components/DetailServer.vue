<!-- 详情页面服务器 -->
<template>
  <div style="margin-top:10px;">
    <el-divider/>
    <el-row style="margin-bottom:10px;">
      <el-col :span="18"><h3>服务器信息</h3></el-col>
      <el-col :span="6" style="font-size:12px;">查看更多<i class="el-icon-arrow-right" @click="test"></i></el-col>
    </el-row>
    <el-card>
      <el-row>
        <el-col :span="8"><p class="">品牌型号：</p></el-col>
        <el-col :span="16"><span>戴尔T140</span></el-col>       
      </el-row>
      <el-row>
        <el-col :span="8"><p class="">CPU：</p></el-col>
        <el-col :span="16"><span>银牌4110</span></el-col>       
      </el-row>
      <el-row>
        <el-col :span="8"><p class="">内存：</p></el-col>
        <el-col :span="16"><span>8G</span></el-col>       
      </el-row>
      <el-row>
        <el-col :span="8"><p class="">硬盘：</p></el-col>
        <el-col :span="16"><span>8T(4T*3)</span></el-col>       
      </el-row>
      <el-row>
        <el-col :span="8"><p class="">网卡1：</p></el-col>
        <el-col :span="8"><span>192.168.0.89</span></el-col> 
        <el-col :span="8"><p class="">连接风机</p></el-col>       
      </el-row>
      <el-row>
        <el-col :span="8"><p class="">网卡2：</p></el-col>
        <el-col :span="8"><span>192.168.2.155</span></el-col> 
        <el-col :span="8"><p class="">连接隔离</p></el-col>       
      </el-row>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'DetailServer'
    
  }
</script>

<style scoped>
  
</style>