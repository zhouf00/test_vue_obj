<!-- 详情页面 -->
<template>
  <div class="wrapper">
    <nav-bar>
      <div slot="left" @click="backPM">
         <i class="el-icon-arrow-left"></i>
      </div>
      <div slot="center">{{obj.value}}</div>
    </nav-bar>
    <!-- <detail-tab :titles="['跟踪情况','服务器信息','库存情况','风机信息',]"/> -->
    <div class="content" v-infinite-scroll="load" 
      style="overflow:auto"
      infinite-scroll-disabled="disabled">
      <div class="block">
        <!-- 使用el-image一定要传入链接 -->
        <el-image :src="'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'">
          <div slot="placeholder" class="image-slot">
            加载中<span class="dot">...</span>
          </div>
        </el-image>
      </div>
      <!-- 状态 -->
      <div>
        <el-row >
          <el-col :span="6">
            <pm-tag :pmStatus="'试运行'"/>
          </el-col>
          <el-col :span="12" style="padding:5px 5px">
            <span v-for="(tag,index) in ['振动','油液']" >{{tag}}<el-divider v-if="index !== ['振动','油液'].length-1" direction="vertical"/>
            </span>
          </el-col>
        </el-row>
      </div>
      <!-- 基本情况 -->
      <detail-info/>

      <!-- 跟踪情况 -->
      <detail-log/>

      <!-- 库存情况 -->
      <detail-stock/>

      <!-- 服务器情况 -->
      <detail-server/>

      <!-- 风机情况 -->
      <detail-facility/>
    </div>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  import PmTag from 'components/content/tag/PmTag'
  import DetailTab from 'components/content/tabcontrol/DetailTab'

  import DetailInfo from './components/DetailInfo'
  import DetailLog from './components/DetailLog'
  import DetailStock from './components/DetailStock'
  import DetailServer from './components/DetailServer'
  import DetailFacility from './components/DetailFacility'

  export default {
    name: 'Detail',
    components: {
      NavBar,
      PmTag,
      DetailTab,

      DetailInfo,
      DetailLog,
      DetailStock,
      DetailServer,
      DetailFacility
    },
    mounted(){
      this.getPMData()
    },
    data() {
      return {
        obj: '',
        activeName: 'first',
        path: '/pm'
      }
    },
    methods:{
      backPM() {
        this.$router.push('/pm')
      },
      getPMData() {
        let data = {'id': 1,
          'value': '寒风岭风电场',
          'address': '山西', 
          'tag':['振动','油液'], 
          'windpower':['金风科技','联合致力'],
          'telephone':'1388888888',
          'status':'试运行'}
        this.obj = data
      },
      load() {
      }
    },
    
  }
</script>

<style scoped>
  .wrapper {
    height: 100vh;
    position: relative;
  }
  .content {
    overflow: hidden;
    position: absolute;
    top:45px;
    bottom:50px;
    left: 8px;
    right: 8px;
  }
</style>