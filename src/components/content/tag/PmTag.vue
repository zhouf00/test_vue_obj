<!-- 标签 -->
<template>
  <el-tag :type="TagType(status[pmStatus])" >{{status[pmStatus]}}</el-tag>
</template>

<script>
  export default {
    name: 'PmTag',
    props: {
      pmStatus:{
        type:Number,
        default(){
          return ''
        }
      }
    },
    data() {
      return {
        status: {
          '1': '安装',
          '2': '数据验收',
          '3': '施工',
          '4': '消缺',
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