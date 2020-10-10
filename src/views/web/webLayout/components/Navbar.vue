<!-- 导航条 -->
<template>
  <el-menu class="navbar" mode="horizontal">
    <!-- 左侧收缩未完成 -->
    <!-- <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened" /> -->
    <breadcrumb/>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img class="user-avatar" :src="avatar">
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <el-dropdown-item>
          <span @click="logout" style="display:block;">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Hamburger from 'components/content/Hamburger'
  import Breadcrumb from 'components/content/Breadcrumb'

  export default {
    name: 'Navbar',
    components:{
      Hamburger,
      Breadcrumb
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'avatar'
      ])
    },
    methods: {
      logout() {
        this.$store.dispatch('Logout').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      },
      toggleSideBar() {
        this.$store.dispatch('ToggleSideBar')
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>