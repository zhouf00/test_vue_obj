<!-- 网页后台加载框架 -->
<template>
  <div class="app-wrapper" >
    <sidebar class="sidebar-container"/>
    <div class="main-container">
      <navbar/>
      <app-main/>
    </div>
  </div>
</template>

<script>
  import {Navbar, AppMain, Sidebar} from './components'
  import ResizeMixin from './mixin/ResizeHandler'
  
  export default {
    name: 'WebLayout',
    components:{
      Navbar,
      AppMain,
      Sidebar
    },
    // mixins: [ResizeMixin],
    computed: {

    }

  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/assets/styles/index.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
  
</style>