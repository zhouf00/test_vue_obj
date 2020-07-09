<!-- 详情页面 -->
<template>
  <div>
    <nav-bar>
      <div slot="left" @click="backHome">
         <i class="el-icon-arrow-left yellow"></i>
      </div>
    </nav-bar>
    <h2>详情</h2>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  export default {
    name: 'Detail',
    components: {
      NavBar
    }
    
  }
</script>

<style scoped>
  
</style>