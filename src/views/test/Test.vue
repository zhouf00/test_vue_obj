<!-- 测试页 -->
<template>
  <div>
    <div>
      <el-radio-group v-model="radio">
        <el-radio :label="3"></el-radio>
        <el-radio :label="6"></el-radio>
        <el-radio :label="9"></el-radio>
      </el-radio-group>
    </div>
    <div>
      <el-radio-group v-model="radio1">
        <el-radio-button label="上海"></el-radio-button>
        <el-radio-button label="北京"></el-radio-button>
        <el-radio-button label="广州"></el-radio-button>
        <el-radio-button label="深圳"></el-radio-button>
      </el-radio-group>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Test',
    data() {
      return {
        radio:3,
        radio1: '上海'
      }
    }
    
  }
</script>

<style>
  
</style>