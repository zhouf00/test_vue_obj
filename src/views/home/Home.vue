<!-- 首页 -->
<template>
  <div>
    <p>{{$store.getters.name}}</p><p @click="Logout">注销</p>
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
      },
    },
    methods: {
      Logout() {
        this.$store.dispatch('Logout').then(() => {
          console.log('注销成功');
          location.reload()
        })
      }
    }
  }
</script>
<style scoped>
    
</style>