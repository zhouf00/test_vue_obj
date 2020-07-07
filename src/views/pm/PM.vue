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
    <tab-control :titles="['区域', '类型', '状态', '更多']"
                 @tabClick="tabClick"/>
    <region-filter v-show="tabshow===0" 
                   :provinces="provinces"
                   @sureClick="sureClick"/>
    <region-filter v-show="tabshow===1" 
                   :provinces="['长沙会战']"
                   @sureClick="sureClick"/>
    <region-filter v-show="tabshow===2" 
                   :provinces="['太原会战']"
                   @sureClick="sureClick"/>                   
    <region-filter v-show="tabshow===3" 
                   :provinces="['台儿庄会战']"
                   @sureClick="sureClick"/>
    <!-- <div v-for="item in allData" v-show="!temp.value"> -->
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
        provinces: ['浙江','安徽','江苏','上海','北京','天津','重庆']
      }
    },
    created () {
      this.allData = this.loadPMdata()
    },
    mounted() {
      // this.restaurants = this.loadPMdata()
      this.isShowAll
    },
    methods:{
      loadPMdata(){
        return [
          {'value': '寒风岭风电场',
          'address': '山西', 
          'tag':['振动','油液'], 
          'windpower':['金风科技','联合致力'],
          'telephone':'1388888888',
          'status':'试运行'},
          {'value': '灌云风电场',
          'address': '连云港', 
          'tag':['振动','油液'], 
          'windpower':['联合致力'],
          'telephone':'1388888888',
          'status':'消缺'},
          {'value': '华益风电场',
          'address': '锡铁山', 
          'tag':['振动','油液'], 
          'windpower':['联合致力'],
          'telephone':'1388888888',
          'status':'施工'},
          {'value': '茶山风电场',
          'address': '宁波', 
          'tag':['振动','油液'], 
          'windpower':['联合致力'],
          'telephone':'1388888888',
          'status':'数据验收'},
          {'value': '东山风电场',
          'address': '河北',
          'tag':['叶片','油液'],},
        ]
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
        }else{
          this.tabshow = index
        }
      },
      suerSelect(value) {
        if(this.temp){
          this.temp= []
        }
        this.temp.push(value)
        console.log(this.temp);
        
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
      }
    },
    computed:{
      isShowAll(){
        return this.temp.length ? true : false
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
    top:80px;
    bottom:50px;
    left: 0;
    right: 0;
  }
</style>