<!-- 设备 -->
<template>
  <div>
    <nav-bar>
      <div slot="left" @click="back">
         <i class="el-icon-arrow-left"></i>
      </div>
      <div slot="center">哈哈</div>
    </nav-bar>
    {{this.$route.params.id}}
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  export default {
    name: 'Facility',
    components: {
      NavBar
    },
    methods:{
      back() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
  
</style>