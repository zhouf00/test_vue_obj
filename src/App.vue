<template>
  <div id="app">
    <!-- <keep-alive> -->
      <!-- <router-view :key="user.id"/> -->
      <router-view />
    <!-- </keep-alive>  -->
  </div>
</template>

<script>
  export default {
    name: 'App',
    created () {
    // 在页面加载时读取sessionStorage
    // if (sessionStorage.getItem('store')) {
    //   this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
    //   console.log(this.$store.state,'加载')
    // }
    // 在页面刷新时将store保存到sessionStorage里
    // window.addEventListener('beforeunload', () => {
    //   sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    //   console.log(this.$store.state,'刷新')
    // })
  }
  }
</script>

<style>
  @import 'assets/css/base.css';
</style>
