<!-- 详情页面服务器 -->
<template>
  <div style="margin-top:10px;">
    <el-divider/>
    <detail-headline :title="'服务器信息'"/>
    <el-card v-for="item in serverData">
      <el-row>
        <el-col :span="8"><p class="">品牌型号：</p></el-col>
        <el-col :span="16"><span>{{item.model}}</span></el-col>       
      </el-row>
      <el-row>
        <el-col :span="8"><p class="">CPU：</p></el-col>
        <el-col :span="16"><span>{{item.cpu_list.info}}</span></el-col>       
      </el-row>
      <el-row>
        <el-col :span="8"><p class="">内存：{{item.ram_list}}</p></el-col>
        <el-col :span="16"><span v-for="ram in item.ram_list">{{item.ram_list}}</span></el-col>       
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
  import DetailHeadline from 'components/content/tabcontrol/DetailHeadline'

  export default {
    name: 'DetailServer',
    components:{
      DetailHeadline
    },
    props:{
      serverData: {
        type: Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
  
</style>