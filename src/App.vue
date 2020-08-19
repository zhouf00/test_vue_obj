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
  }
</script>

<style>
  @import 'assets/css/base.css';
</style>
