<!--  -->
<template>
  <div class="province">
    <div  v-for="item in provinces">
      <el-button @click="selectClick(item)">{{item}}</el-button>
    </div>
    <div >
      <el-button type="success" @click="sureClick">确认</el-button>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'RegionFilter',
    data() {
      return {
        chechedPro: ['浙江'],
      }
    },
    props: {
      provinces:{
        type: Array,
        default() {
          return  []
        }
      },
      drawer:{
        type:Boolean,
        default(){
          return false
        }
      }
    },
    methods:{
      sureClick() {
        this.$emit('sureClick', this.temp)
      },
      selectClick(item) {
        this.temp = item   
      }
    },
  }
</script>
<style scoped>
 /* .province {
   box-shadow: 1px 1px 1px rgba(100, 100, 100, .1);
 } */
  
</style>