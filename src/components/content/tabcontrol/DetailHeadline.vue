<!-- 详情标题 -->
<template>
  <!-- <el-divider/> -->
  <el-row style="margin-bottom:10px;">
    <el-col :span="18"><h3>{{title}} <i class="el-icon-edit" @click="test"/></h3></el-col>
    <!-- <el-col :span="2"></el-col> -->
    <el-col :span="6" style="font-size:13px;">查看更多<i class="el-icon-arrow-right"></i></el-col>
  </el-row>
</template>

<script>
  export default {
    name: 'DetailHeadline',
    props: {
      title: {
        type:String,
        default(){
          return '默认'
        }
      }
    },
    methods: {
      test() {
        // console.log('aaa')
      }
    }
  }
</script>
<style scoped>
  
</style>