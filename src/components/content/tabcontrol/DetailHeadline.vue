<!-- 详情标题 -->
<template>
  <!-- <el-divider/> -->
  <el-row style="margin-bottom:10px;">
    <el-col :span="18"><h3>{{title}}</h3></el-col>
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
    data() {
      return {
        url: ''
      }
    },
    methods: {
      test() {
        // 判断跳转位置
        switch(this.title){
          case '基本信息':
            this.url = 'info'
            break
          case '风机信息':
            this.url = 'facility'
            break
          default:
            console.log('看看')
        }
        this.$router.push({
          name: this.url
        })
      }
    }
  }
</script>
<style scoped>
  
</style>