<!-- 项目状态选择器 -->
<template>
  <div>
    <el-select size="small"
      v-model="value" v-if="disableShow">
      <el-option v-for="item in projectStatus"
        :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <p v-else>{{projectStatus[value].label}}</p>
  </div>
</template>

<script>
  export default {
    name: 'projectStatusSelect',
    props:{
      value: {
        type: Number,
        default: null
      },
      disableShow:{
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        projectStatus:[
          {value:1, label: '安装'},
          {value:2, label: '调试'},
          {value:3, label: '试运行'},
        ],
      }
    }
    
  }
</script>

<style scoped>
  
</style>