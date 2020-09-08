<!-- 优先级标签 -->
<template>
  <el-tag :type="priorityShow(value).type" effect="dark">{{priorityShow(value).title}}</el-tag>
</template>

<script>
  export default {
    name: 'prioritTag',
    props: {
      value: {
        type: Number,
        default: null
      }
    },
    computed: {
      // 优先级转换
      priorityShow() {
        return priority => {
          let priority_type = {}
            switch(priority){
              case 1:
                priority_type = {type: 'success', title: '普通'} 
                break
              case 2:
                priority_type = {type: 'warning', title: '一般'} 
                break
              case 3:
                priority_type = {type: 'danger', title: '紧急'} 
                break
            }
            return priority_type
        }
      }
    }
    
  }
</script>

<style scoped>
  
</style>