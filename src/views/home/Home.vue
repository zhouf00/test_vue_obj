<!-- 首页 -->
<template>
  <div>
    <el-row>
      <el-col :span="8"><p>{{$store.getters.name}}</p></el-col>
      <el-col :span="8"><p @click="Logout" style="color:red">注销</p></el-col>
    </el-row>
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
        return ['项目管理', '资产管理', '诊断报告提醒']
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