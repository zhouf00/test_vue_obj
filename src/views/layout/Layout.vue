<!--  -->
<template>
  <div>
    <app-main></app-main>
    <nav-bar v-if="$store.getters.navbarStatus"></nav-bar>
  </div>
</template>

<script>
  import {NavBar, AppMain} from './components'
  export default {
    name: 'Layout',
    components: {
      NavBar,
      AppMain
    },
    mixins: [], // 混入对象
  }
</script>
<style scoped>
  
</style>