<!-- 详情页面 -->
<template>
  <div class="wrapper">
    <nav-bar>
      <div slot="left" @click="backPM">
         <i class="el-icon-arrow-left"></i>
      </div>
      <div slot="center">{{obj.value}}</div>
    </nav-bar>
    <detail-tab :titles="['基本信息','跟踪情况','服务器信息','风机信息',]"/>
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
      <!-- 介绍 -->
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
        <el-row>
          <el-col :span="18"><h3>基本信息</h3></el-col>
          <el-col :span="6" style="font-size:12px;">查看更多<i class="el-icon-arrow-right" @click="test"></i></el-col>
        </el-row>
        <el-divider/>
        <el-row>
          <el-col :span="6"><p>内部号：</p></el-col>
          <el-col :span="12"><span class="demonstration">项目XXX</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="6"><p class="">主机厂：</p></el-col>
          <el-col :span="12"><span>联合动力、GE</span></el-col>       
        </el-row>
        <el-row>
          <el-col :span="6"><p class="">风季时间：</p></el-col>
          <el-col :span="12"><span>6月，7月</span></el-col>       
        </el-row>
        <el-row>
          <el-col :span="6"><p class="">地址：</p></el-col>
          <el-col :span="12"><span>山西省大同市寒风岭村</span></el-col>       
        </el-row>
      </div>
      <!-- 跟踪情况 -->
      <div style="margin-top:10px;">
        <el-row>
          <el-col :span="18"><h3>跟踪情况</h3></el-col>
          <el-col :span="6" style="font-size:12px;">查看更多<i class="el-icon-arrow-right" @click="test"></i></el-col>
        </el-row>
        <el-divider></el-divider>
        <div>
          <el-timeline :reverse="true">
            <el-timeline-item
              :icon="'el-icon-more'"
              :color="'#0bbd87'"
              :timestamp="'2020-7-13'">
              加班
            </el-timeline-item>
            <el-timeline-item
              :icon="'el-icon-more'"
              :color="'#0bbd87'"
              :timestamp="'2020-7-20'">
              1号风机 更换采集站
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
      <!-- 服务器情况 -->
      <div style="margin-top:10px;">
        <el-row>
          <el-col :span="18"><h3>服务器信息</h3></el-col>
          <el-col :span="6" style="font-size:12px;">查看更多<i class="el-icon-arrow-right" @click="test"></i></el-col>
        </el-row>
        <el-divider></el-divider>
        <div>
          <el-row>
            <el-col :span="6"><p class="">品牌型号：</p></el-col>
            <el-col :span="18"><span>戴尔T140</span></el-col>       
          </el-row>
          <el-row>
            <el-col :span="6"><p class="">CPU：</p></el-col>
            <el-col :span="18"><span>银牌4110</span></el-col>       
          </el-row>
          <el-row>
            <el-col :span="6"><p class="">内存：</p></el-col>
            <el-col :span="18"><span>8G</span></el-col>       
          </el-row>
          <el-row>
            <el-col :span="6"><p class="">硬盘：</p></el-col>
            <el-col :span="18"><span>8T(4T*3)</span></el-col>       
          </el-row>
          <el-row>
            <el-col :span="6"><p class="">网卡1：</p></el-col>
            <el-col :span="8"><span>192.168.0.89</span></el-col> 
            <el-col :span="10"><p class="">连接风机</p></el-col>       
          </el-row>
          <el-row>
            <el-col :span="6"><p class="">网卡2：</p></el-col>
            <el-col :span="8"><span>192.168.2.155</span></el-col> 
            <el-col :span="10"><p class="">连接隔离</p></el-col>       
          </el-row>
        </div>
      </div>
      <!-- 风机情况 -->
      <div style="margin-top:10px;">
        <el-row>
          <el-col :span="18"><h3>风机情况</h3></el-col>
          <el-col :span="6" style="font-size:12px;">查看更多<i class="el-icon-arrow-right" @click="test"></i></el-col>
        </el-row>
        <el-divider></el-divider>
        <div >
          <el-row v-for="counter in 100" style="margin-bottom:5px;">
            <el-col :span="8"><img src="~assets/img/detail/default.jpg" alt="" style="width:80%;height:100%"></el-col>
            <el-col :span="16">
              <el-row style="margin-bottom:5px;">
                <h4>{{counter}}号风机
                <span v-show="counter%2 !== 0" style="color:green"><i class="el-icon-circle-check"/>正常</span>
                <span v-show="counter%2 === 0" style="color:red"><i class="el-icon-circle-close"/>异常</span>
                </h4>
              </el-row>
              <el-row style="margin-bottom:5px;">
                <span>联合动力 直驱2.0</span>
              </el-row>
              <el-row>
                <span>叶片监测 油液监测</span>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  import PmTag from 'components/content/tag/PmTag'
  import DetailTab from 'components/content/tabcontrol/DetailTab'

  export default {
    name: 'Detail',
    components: {
      NavBar,
      PmTag,
      DetailTab
    },
    mounted(){
      this.getPMData()
    },
    data() {
      return {
        obj: '',
        activeName: 'first'
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
      test() {
        console.log('aaa');
        
      }
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
    top:85px;
    bottom:50px;
    left: 8px;
    right: 8px;
  }
</style>