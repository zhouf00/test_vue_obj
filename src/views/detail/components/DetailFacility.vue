<!-- 详情页面设备 -->
<template>
  <div style="margin-top:10px;">
    <el-divider/>
    <!-- <el-row style="margin-bottom:10px;">
      <el-col :span="18"><h3>风机情况</h3></el-col>
      <el-col :span="6" style="font-size:12px;">查看更多<i class="el-icon-arrow-right"></i></el-col>
    </el-row> -->
    <detail-headline :title="'风机信息'"/>
    <div >
      <el-row v-for="counter in 100" style="margin-bottom:5px;">
        <el-col :span="8"><img src="~assets/img/detail/default.jpg" alt="" style="width:80%;height:100%"></el-col>
        <el-col :span="16">
          <el-row style="margin-bottom:5px;">
            <h4>{{counter}}号风机
            <span v-show="counter%2 !== 0" style="color:green"><i class="el-icon-circle-check"/>正常</span>
            <span v-show="counter%2 === 0" style="color:red"><i class="el-icon-circle-close"/>异常</span>
            </h4>
          </el-row>
          <el-row style="margin-bottom:5px;">
            <span>联合动力 直驱2.0</span>
          </el-row>
          <el-row>
            <span>叶片监测 油液监测</span>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import DetailHeadline from 'components/content/tabcontrol/DetailHeadline'
  export default {
    name: 'DetailFacility',
    components:{
      DetailHeadline
    }
  }
</script>

<style scoped>
  
</style>