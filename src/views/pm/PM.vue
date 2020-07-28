<!-- 项目管理 -->
<template>
  <div id="pm" class="wrapper">
    <!-- 默认导航条 -->
    <nav-bar class="pm-nav" v-show="isShow">
      <div slot="left" @click="backHome">
        <!-- <img src="~assets/img/common/back.svg" alt=""> -->
         <i class="el-icon-arrow-left yellow"></i>
      </div>
      <div slot="center">项目管理</div>
      <div slot="right" @click="searchClick">
        <img src="~assets/img/common/search.svg" alt="">
      </div>
    </nav-bar>
    <!-- 搜索导航条 -->
    <nav-bar-search v-show="!isShow" 
                    :restaurants="allData"
                    @suerSelect="suerSelect">
      <div slot="left"  @click="searchClick">
        <i class="el-icon-arrow-left yellow"></i>
      </div>
      <div slot="right" @click="queryClick">搜索</div>
    </nav-bar-search>
    <!-- 筛选导航条 -->
    <tab-control  :titles="['区域', '类型', '状态', '更多']"
      @tabClick="tabClick" :tabShow="istabShow"/>
    <el-drawer :visible.sync="dialog" :direction="'ttb'"
      :modal="false" :show-close="false"
      :size="'a'" :before-close="handleClose"
      style="top:84px;">
      <region-filter v-show="tabshow===0" :provinces="provinces"
        @sureClick="sureClick" class="regionfilter"/>
      <region-filter v-show="tabshow===1" :provinces="['长沙会战']"
        @sureClick="sureClick" class="regionfilter"/>
      <region-filter v-show="tabshow===2"  :provinces="['太原会战']"
        @sureClick="sureClick" class="regionfilter"/>
      <region-filter v-show="tabshow===3" @sureClick="sureClick"
        :provinces="['台儿庄会战']" class="regionfilter"/>
    </el-drawer>                   
    <p-m-list-view v-show="!isShowAll" class="content" :allData="allData"/>
    <p-m-list-view v-show="isShowAll" class="content" :allData="temp"/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import NavBarSearch from 'components/content/navbarsearch/NavBarSearch'
  import TabControl from 'components/content/tabcontrol/TabControl'
  import RegionFilter from 'components/content/tabcontrol/childTab/RegionFilter'

  import PMListView from './childView/PMListView'

  import {getProjects} from 'network/pm'

  export default {
    name: 'PM',
    components:{
      NavBar,
      NavBarSearch,
      TabControl,
      RegionFilter,
      PMListView
    },
    data() {
      return {
        allData:[],
        isShow: true,
        temp: [],
        tabshow: '',
        dialog: false,
        provinces: ['浙江','安徽','江苏','上海','北京','天津','重庆'],

      }
    },
    created () {
      this.loadPMdata()
      console.log(this.tabshow)
    },
    activated() {
      // this.$router.push('/detail/寒风岭风电场')
    },
    // beforeRouteLeave(to, from, next){
    //   console.log(this.$route.path);
    //   this.path = this.$route.path;
    //   next()
    // },
    mounted() {
      // this.restaurants = this.loadPMdata()
      this.isShowAll
    },
    methods:{
      loadPMdata(){
        getProjects().then(res => {
          this.allData = res
          console.log(res)
        })
      },
      backHome() {
        this.$router.push('/home')
      },
      searchClick(){
        if (this.isShow) {
          this.isShow = false
        } else {
          this.isShow = true
        }
      },
      tabClick(index){
        
        if (this.tabshow === index){
          this.tabshow = ''
          this.dialog = false
        }else{
          this.tabshow = index
          this.dialog = true
        }
        console.log(this.tabshow);
      },
      suerSelect(value) {
        if(this.temp){
          this.temp= []
        }
        this.temp.push(value)
      },
      queryClick(){
        // this.allData.push('蒙东风电场')
        if(this.temp){
          this.temp = {}
        }
      },
      sureClick(address){
        // 返回筛选选择结果
        console.log(address);
      },
      handleClose(done){
        this.tabClick(this.tabshow)
        console.log(this.tabshow)
      }
    },
    computed:{
      isShowAll(){
        return this.temp.length ? true : false
      },
      istabShow(){
        return this.tabshow
      }
    }
  }
</script>
<style scoped>
  .wrapper {
    height: 100vh;
    position: relative;
  }
  .pm-nav {
    background-color: #409EFF;
    color: #fff
  }
  .pm-nav img {
    width: 20px;
    height: 20px;
    margin-top: 5px;
    vertical-align: middle;
    margin-bottom: 5px;
  }
  .content {
    overflow: hidden;
    position: absolute;
    top:84px;
    bottom:50px;
    left: 0;
    right: 0;
  }
</style>