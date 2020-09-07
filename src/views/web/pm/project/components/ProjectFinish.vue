<!-- 项目添加完成页面 -->
<template>
  <div>
    <div style="text-align: center">
      <h2>{{value.name}}</h2>
    </div>
    <div style="text-align: center">
      <el-button type="primary" size="medium"
        @click="handleFinishCommit">完成</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ProjectFinish',
    props:{
      value: Object,
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      handleFinishCommit() {
        this.$emit('finishCommit', this.isEdit)
      }
    }
  }
</script>

<style scoped>
  
</style>