<!--  -->
<template>
  <div>
    <main-tab-bar :navbarData="navbar"></main-tab-bar>
  </div>
</template>

<script>
  import MainTabBar from 'components/content/maintabbar/MainTabBar'

  export default {
    name: 'NavBar',
    components:{
      MainTabBar
    },
    computed:{
      navbar() {
        let status = this.$store.getters.navbarStatus
        switch (status){
          case 'PM':
            return {path:'/pm', name: '项目'}
          case 'AMS':
            return {path:'/ams', name: '资产'}
        }
      }
    }
  }
</script>
<style scoped>
  
</style>