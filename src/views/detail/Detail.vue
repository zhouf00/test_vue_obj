<!-- 详情页面 -->
<template>
  <div class="wrapper" v-if="loading">
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
      <div class="block"  >
        <!-- 使用el-image一定要传入链接 -->
        <el-image :src="obj.image">
          <div slot="placeholder" class="image-slot">
            加载中<span class="dot">...</span>
          </div>
        </el-image>
      </div>
      <!-- 状态 -->
      <div style="margin-top:5px;">
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
      <div >
        <el-divider/>
        <detail-headline :title="'基本信息'"/>
        <el-row>
          <el-col :span="7"><p>内部号：</p></el-col>
          <el-col :span="12"><span class="demonstration">{{obj.sn}}</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="7"><p class="">主机厂：</p></el-col>
          <el-col :span="12"><span v-for="manu in obj.manu_list">{{manu.title}} </span></el-col>       
        </el-row>
        <el-row>
          <el-col :span="7"><p class="">地址：</p></el-col>
          <el-col :span="12"><span>{{obj.address}}</span></el-col>       
        </el-row>
        <el-row>
          <el-col :span="7"><p class="">施工人：</p></el-col>
          <el-col :span="12"><span>李靖(负责) 李启龙(协助) 周凡(协助)</span></el-col>       
        </el-row>
        <el-row>
          <el-col :span="7"><p class="">其它说明：</p></el-col>
          <el-col :span="12"><span>{{obj.memo}}</span></el-col>       
        </el-row>
      </div>

      <!-- 跟踪情况 -->
      <detail-log/>

      <!-- 库存情况 -->
      <detail-stock/>

      <!-- 服务器情况 -->
      <detail-server :serverData="obj.server"/>

      <!-- 风机情况 -->
      <detail-facility :facilitys="obj.facility"/>
    </div>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  import PmTag from 'components/content/tag/PmTag'
  import DetailTab from 'components/content/tabcontrol/DetailTab'
  import DetailHeadline from 'components/content/tabcontrol/DetailHeadline'

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
      DetailHeadline,

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
        iid: null,
        // 数据加载完成后渲染
        loading: false
      }
    },
    created() {

    },
    mounted(){
      this.getPMData()
    },
    methods:{
      backPM() {
        this.$router.go(-1)
      },
      getPMData() {
        this.iid = this.$route.params.name
        getDetail(this.iid).then(res => {
          this.obj = res[0]
          this.loading = true
          // console.log(this.obj, this.loading);
        })
      },
      load() {
      }
    },
    beforeRouteLeave:function(to, from, next){
      // 离开项目时，清除缓存
      if(!to.name){
        this.$destroy();
      }
      next()
    }
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