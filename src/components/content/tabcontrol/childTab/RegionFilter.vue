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
  </div>
</template>

<script>
  export default {
    name: 'RegionFilter',
    data() {
      return {
        // provinces: ['浙江','安徽','江苏','上海','北京','天津','重庆']
        temp: '',
        chechedPro: ['浙江']
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