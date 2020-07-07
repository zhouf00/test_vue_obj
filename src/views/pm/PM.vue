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
    <!-- <nav-bar v-show="!isShow">
      <div slot="left"  @click="searchClick">
        <i class="el-icon-arrow-left yellow"></i>
      </div>
      <div slot="center">
        <el-autocomplete poper-class="my-autocomplete"
                         v-model="state"
                         :fetch-suggestions="querySearch"
                         placeholder="请输入内容"
                         @select="handleSelect">
          <i class="el-icon-search" slot="prefix"></i>
        </el-autocomplete>
        </div>
      <div slot="right" @click="queryClick">搜索</div>
    </nav-bar> -->
    <nav-bar-search v-show="!isShow" 
                    :restaurants="allData">
      <div slot="left"  @click="searchClick">
        <i class="el-icon-arrow-left yellow"></i>
      </div>
      <div slot="right" @click="queryClick">搜索</div>
    </nav-bar-search>
    <!-- 筛选导航条 -->
    <tab-control :titles="['区域', '类型', '状态', '更多']"
                 @tabClick="tabClick"/>
    <region-filter v-show="tabshow===0" 
                   :provinces="provinces"
                   @sureClick="sureClick"/>
    <div class="my-status" v-show="tabshow===1">
      <span v-for="couter in 10">{{couter}}<br></span>
    </div>
    <div v-for="item in allData" v-show="!temp.value">
      <span>{{item}}</span>
    </div>
    <div v-show="temp.value">
      <span>{{temp}}</span>
    </div>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import NavBarSearch from 'components/content/navbarsearch/NavBarSearch'
  import TabControl from 'components/content/tabcontrol/TabControl'
  import RegionFilter from 'components/content/tabcontrol/childTab/RegionFilter'

  export default {
    name: 'PM',
    components:{
      NavBar,
      NavBarSearch,
      TabControl,
      RegionFilter
    },
    data() {
      return {
        allData:[],
        isShow: true,
        temp: {},
        tabshow: '',
        provinces: ['浙江','安徽','江苏','上海','北京','天津','重庆']
      }
    },
    created () {
      this.allData = this.loadPMdata()
    },
    mounted() {
      // this.restaurants = this.loadPMdata()
    },
    methods:{
      loadPMdata(){
        return [
          {'value': '寒风岭风电场','address': '山西'},
          {'value': '东山风电场','address': '河北'},
        ]
      },
      backHome() {
        this.$router.push('/home')
      },
      searchClick(){
        console.log('search');
        if (this.isShow) {
          this.isShow = false
        } else {
          this.isShow = true
        }
      },
      tabClick(index){
        if (this.tabshow === 0 | this.tabshow){
          this.tabshow = ''
        }else{
          this.tabshow = index
        }
      },
      queryClick(){
        // this.allData.push('蒙东风电场')
        if(this.temp){
          this.temp = {}
        }
      },
      sureClick(address){
        console.log(address);
        
      }
    }
  }
</script>
<style scoped>
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
</style>