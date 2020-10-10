<!-- 优先级标签 -->
<template>
  <el-select size="small" placeholder="请选择状态" v-if="disableShow"
    :value="value" 
    @input="$emit('input', $event)">
    <el-option v-for="item in priorityList"
      :key="item.value" :label="item.title" :value="item.value"></el-option>
  </el-select>
  <el-tag v-else :type="priorityShow(value).type" effect="dark">{{priorityShow(value).title}}</el-tag>
</template>

<script>
  export default {
    name: 'prioritTag',
    props: {
      value: {
        type: Number,
        default: null
      },
      disableShow:{
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        priorityList: [
          {value:1, type: 'success', title: '普通'},
          {value:2, type: 'warning', title: '一般'},
          {value:3, type: 'danger', title: '紧急'}
        ]
      }
    },
    computed: {
      // 优先级转换
      priorityShow() {
        return priority => {
          let priority_type = {}
            switch(priority){
              case 1:
                priority_type = this.priorityList[0]
                break
              case 2:
                priority_type =  this.priorityList[1]
                break
              case 3:
                priority_type =  this.priorityList[2]
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