<!-- 穿梭框 -->
<template>
  <div>
    
      
      <div style="margin-top: 20px;text-align: end;">
        <el-button @click="closeAfter(2)" size="small">取 消</el-button>
        <el-button
          @click="confirmTransferPersonnel()"
          size="small"
          type="primary"
          :disabled="personValue.length===0"
        >确 认</el-button>
      </div>
    
  </div>
</template>

<script>
  export default {
    name: 'DeptTransfer',
    props: {
      
    },
    data() {
      return {
        personValue: [],
      }
    },
    methods: {
      
    }
  }
</script>
<style scoped>
  
</style>