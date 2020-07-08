<!--  -->
<template>
  <div>
    <!-- <el-divider/> -->
    <div class="province" v-for="item in provinces">
      <el-button @click="selectClick(item)">{{item}}</el-button>
    </div>
    <div >
      <el-button type="success" @click="sureClick">确认</el-button>
    </div>
    <!-- <el-dialog title="提示"
               :visible.sync="dialogVisible"
               width="30%"
               >
      <span>信息</span>
    </el-dialog> -->
  </div>
</template>

<script>
  export default {
    name: 'RegionFilter',
    data() {
      return {
        chechedPro: ['浙江'],
        dialogVisible: false
      }
    },
    props: {
      provinces:{
        type: Array,
        default() {
          return  []
        }
      }
    },
    methods:{
      sureClick() {
        this.$emit('sureClick', this.temp)
      },
      selectClick(item) {
        this.temp = item   
      },
      handeCheckChange(value) {
        console.log(value.length)
        let checkedCount = value.length;
        // this.isIndeterminate = checkedCount > 0 && checkedCount < this.provinces.length
      }
    },
  }
</script>
<style scoped>
  .province {
    display: flex;
    flex-wrap: wrap; 
    margin-bottom: 10px;
  }

  
</style>