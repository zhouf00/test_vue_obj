<!-- 首页 -->
<template>
  <div>
    <HomeFunc :funcs="showfuncs"/>
    
  </div>
</template>

<script>

  import HomeFunc from './homefunc/HomeFunc'

  export default {
    name: 'Home',
    components: {
      HomeFunc
    },
    data() {
      return {
        
      }
    },
    computed: {
      showfuncs() {
      return ['项目管理', '资产管理','报销管理',]
      }
    }
  }
</script>
<style scoped>
    
</style>