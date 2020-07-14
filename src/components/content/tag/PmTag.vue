<!-- 标签 -->
<template>
  <el-tag :type="TagType(pmStatus)" >{{pmStatus}}</el-tag>
</template>

<script>
  export default {
    name: 'PmTag',
    props: {
      pmStatus:{
        type:String,
        default(){
          return ''
        }
      }
    },
    methods: {
      TagType(val){
        switch(val){
          case '安装':
            return 'warning'
          case '数据验收':
            return 'success'
          case '施工':
            return 'info'
          case '消缺':
            return 'danger'
        }
      }
    }
  }
</script>
<style scoped>
  
</style>