<!-- 左边黑框 -->
<template>
  <div class="scroll-container" ref="srollContainer" @wheel.prevent="handleScroll">
    <div class="scroll-wrapper" ref="scrollWrapper" :style="{top: top+'px'}">
      <slot/>
    </div>    
  </div>
</template>

<script>
  export default {
    name: 'index',
    data() {
      return {
        top: 0
      }
    },
    methods: {
      handeScroll(e){

      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
// @import 'src/assets/styles/index.scss';
@import 'src/assets/styles/variables.scss';
  .scroll-container {
    position: relative;
    width:100%;
    height: 100%;
    background-color: $menuBg;
    .scroll-wrapper{
      position: absolute;
      width: 100%!important;
    }
  }
</style>