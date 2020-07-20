<!-- 详情标题 -->
<template>
  <!-- <el-divider/> -->
  <el-row style="margin-bottom:10px;">
    <el-col :span="18"><h3>{{title}}</h3></el-col>
    <!-- <el-col :span="18"><h3>{{title}} <i class="el-icon-edit" @click="test"/></h3></el-col> -->
    <el-col :span="6" style="font-size:13px;" ><span @click="test">查看更多<i class="el-icon-arrow-right"/></span></el-col>
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
        console.log(this.$route.path);
        this.$router.push(this.$route.path + '/facility?id=1')
        // this.$router.push('/home')
      }
    }
  }
</script>
<style scoped>
  
</style>