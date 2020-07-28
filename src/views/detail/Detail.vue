<!-- 详情页面 -->
<template>
  <div class="wrapper">
    <nav-bar>
      <div slot="left" @click="backPM">
         <i class="el-icon-arrow-left"></i>
      </div>
      <div slot="center">{{obj.name}}</div>
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
            <pm-tag :pmStatus="obj.status"/>
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
      <detail-server :serverData="obj.server_list"/>

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

  import {getDetail} from 'network/detail'

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
    data() {
      return {
        obj: null,
        activeName: 'first',
        path: '/pm',
        iid: null
      }
    },
    created() {
      this.getPMData()
    },
    destroyed() {
      console.log('destroyed');
    },
    mounted(){
      
    },
    methods:{
      backPM() {
        this.$router.push('/pm')
        this.$destroy()
      },
      getPMData() {
        this.iid = this.$route.params.name
        console.log(this.iid);
        getDetail(this.iid).then(res => {
          this.obj = res[0]
          console.log(this.obj);
        })
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