<!-- 筛选导航条 -->
<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles"
         class="tab-control-item"
         :class="{active:index === currentIndex}"
         @click="itemClick(index)">
      <span>{{item}}
        <i v-if="index === currentIndex" class="el-icon-arrow-up"/>
        <i v-else="index === currentIndex" class="el-icon-arrow-down"/>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TabControl',
    props: {
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: ''
      }
    },
    methods: {
      itemClick(index) {
        if(this.currentIndex === index){
          this.currentIndex = ''
        }else{
          this.currentIndex = index;
        }
        // 向父组件传数据
        this.$emit('tabClick', index)
      }
    }
  }
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
  }
  .tab-control-item {
    flex:1;
  }
  .tab-control-item span{
    padding: 5px;
  }
  .active {
    color: var(--color-high-text);
    /* font-size: 15.5px; */
  }
  /* .active span {
    border-bottom: 2px solid var(--color-tint);
  } */
</style>