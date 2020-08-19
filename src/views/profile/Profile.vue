<!-- 用户中心 -->
<template>
  <div>
   <h2>我的</h2>
   <p>用户名：{{$store.getters.name}}</p>
    <el-button @click="Logout">注销</el-button>
  </div>

</template>

<script>

  export default {
    name: 'ProFile',
    data() {
      return {
        
      }
    },
    methods: {
      Logout() {
        this.$store.dispatch('Logout').then(() => {
          console.log('注销成功');
          location.reload()
        })
      }
    },
    components:{

    }
  }
</script>
<style scoped>

</style>  