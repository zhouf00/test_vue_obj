<!-- tabbar主页面 -->
<template>
  <tab-bar>
      <tab-bar-item :path="navbarData.path">
        <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg" alt="">
        <div slot="item-text">{{navbarData.name}}</div>
      </tab-bar-item>
      <!-- <tab-bar-item path='/category'>
        <img slot="item-icon" src="~assets/img/tabbar/category.svg" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/category_active.svg" alt="">
        <div slot="item-text">分类</div>
      </tab-bar-item> -->
      <tab-bar-item path='/task'> 
        <img slot="item-icon" src="~assets/img/tabbar/task.svg" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/task_active.svg" alt="">
        <div slot="item-text">任务</div>
      </tab-bar-item>
      <tab-bar-item path='/profile'>
        <img slot="item-icon" src="~assets/img/tabbar/profile.svg" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/profile_active.svg" alt="">
        <div slot="item-text">我</div>
      </tab-bar-item>
    </tab-bar>
</template>

<script>
  import TabBar from 'components/common/tabbar/TabBar'
  import TabBarItem from 'components/common/tabbar/TabBarItem'

  export default {
    name: 'MainTabBar',
    components: {
      TabBar,
      TabBarItem
    },
    props:{
      navbarData:{
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style >
  
</style>