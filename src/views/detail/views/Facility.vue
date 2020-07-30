<!-- 设备 -->
<template>
  <div v-if="loading" class="wrapper">
    <nav-bar>
      <div slot="left" @click="back">
         <i class="el-icon-arrow-left"></i>
      </div>
      <div slot="center">{{$route.params.name}}</div>
    </nav-bar>
    <div class="content">
      <div style="margin-top:10px; ">
        <h2 style="margin-bottom:10px;">{{facilityData.title}}
          <span v-show="facilityData.status === 1" style="color:green"><i class="el-icon-circle-check"/></span>
          <span v-show="facilityData.status !== 1" style="color:red"><i class="el-icon-circle-close"/></span>
        </h2>
        <el-row>
          <el-col :span="7"><p>主机厂商：</p></el-col>
          <el-col :span="12"><span class="demonstration">{{facilityData.machine.manufacturer.title}}</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="7"><p>机器型号：</p></el-col>
          <el-col :span="12"><span class="demonstration">{{facilityData.machine.title}}</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="7"><p>其它说明：</p></el-col>
          <el-col :span="12"><span class="demonstration">{{facilityData.memo}}</span></el-col>
        </el-row>
      </div>
      <el-divider/>
      <div style="margin-top:20px;" v-for="collector in facilityData.collector">
        <h3 style="margin-bottom:10px;">采集器：{{collector.collector_type.title}} {{collector.collector_type.model}}</h3>
        <el-row>
          <el-col :span="7"><p>编号：</p></el-col>
          <el-col :span="12"><span class="demonstration">{{collector.sn}}</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="7"><p>通道数：</p></el-col>
          <el-col :span="12"><span class="demonstration">{{collector.collector_type.aisle}}</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="7"><p>ip：</p></el-col>
          <el-col :span="12"><span class="demonstration">{{collector.ip}} {{collector.net_mask}}</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="7"><p>软件版本：</p></el-col>
          <el-col :span="12"><span class="demonstration">{{collector.model}}</span></el-col>
        </el-row>
        <div v-for="sensor in sortSensor(collector.sensor)" style="margin-top:10px;">
          <el-row>
            <el-col :span="7"><p>名称：</p></el-col>
            <el-col :span="12"><span class="demonstration">{{sensor.sensor_type.title}}</span></el-col>
          </el-row>
          <el-row>
            <el-col :span="7"><p>通道号：</p></el-col>
            <el-col :span="12"><span class="demonstration">{{sensor.number}}</span></el-col>
          </el-row>
          <el-row>
            <el-col :span="7"><p>编号：</p></el-col>
            <el-col :span="12"><span class="demonstration">{{sensor.sn}}</span></el-col>
          </el-row>
          <el-row>
            <el-col :span="7"><p>位置：</p></el-col>
            <el-col :span="12"><span class="demonstration">{{sensor.install_site}}</span></el-col>
          </el-row>
        </div>
      </div>
      <el-divider/>
      <div>
        <h3 style="margin-bottom:10px;">维护日志</h3>
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  import {getFacility} from 'network/detail'

  export default {
    name: 'Facility',
    components: {
      NavBar
    },
    mounted() {
      this.getFacility()
    },
    data() {
      return {
        fId: '',
        loading: false,
        facilityData: [],
      }
    },
    methods:{
      back() {
        this.$router.go(-1)
      },
      getFacility(){
        this.fId = this.$route.query.search
        // console.log(this.fId);
        getFacility(this.fId).then(res => {
          this.facilityData = res
          this.loading = true
        })
      },
    },
    computed:{
      sortSensor(){
        return function(sensor){
          // slice 浅复制可以解决无限循环排序
          return sensor.slice().sort((a,b) => a.number-b.number)
        }
      }
    },
    beforeRouteLeave:function(to, from, next){
      this.$destroy();
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