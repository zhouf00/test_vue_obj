<!-- 详情页面库存 -->
<template>
  <div style="margin-top:10px;">
    <el-divider/>
    <el-row style="margin-bottom:10px;">
      <el-col :span="18"><h3>库存情况</h3></el-col>
      <el-col :span="6" style="font-size:12px;">查看更多<i class="el-icon-arrow-right" @click="test"></i></el-col>
    </el-row>
    <div>
      <el-timeline :reverse="true">
        <el-timeline-item
          :color="'#0bbd87'"
          :timestamp="'2020-7-13'">
          加班
        </el-timeline-item>
        <el-timeline-item
          :color="'#0bbd87'"
          :timestamp="'2020-7-20'">
          1号风机 更换采集站
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DetailStock'
    
  }
</script>

<style scoped>
  
</style>