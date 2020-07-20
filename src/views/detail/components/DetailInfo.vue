<!-- 详情页面介绍 -->
<template>
  <div style="margin-top:10px;">
    <el-divider/>
    <el-row style="margin-bottom:10px;">
      <el-col :span="18"><h3>基本信息</h3></el-col>
      <el-col :span="6" style="font-size:12px;">查看更多<i class="el-icon-arrow-right"></i></el-col>
    </el-row>
    <el-row>
      <el-col :span="6"><p>内部号：</p></el-col>
      <el-col :span="12"><span class="demonstration">项目XXX</span></el-col>
    </el-row>
    <el-row>
      <el-col :span="6"><p class="">主机厂：</p></el-col>
      <el-col :span="12"><span>联合动力、GE</span></el-col>       
    </el-row>
    <el-row>
      <el-col :span="6"><p class="">风季时间：</p></el-col>
      <el-col :span="12"><span>6月，7月</span></el-col>       
    </el-row>
    <el-row>
      <el-col :span="6"><p class="">地址：</p></el-col>
      <el-col :span="12"><span>山西省大同市寒风岭村</span></el-col>       
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'DetailInfo'
    
  }
</script>

<style scoped>
  
</style>