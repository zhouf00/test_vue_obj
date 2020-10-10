<!-- 首页 -->
<template>
  <div>
    <el-row>
      <el-col :span="8"><p>{{$store.getters.name}}</p></el-col>
      <el-col :span="8"><p @click="Logout" style="color:red">注销</p></el-col>
    </el-row>
    <el-button @click="openScanQrCode()">扫一扫</el-button>
    {{test}}{{aa}}
    <HomeFunc :funcs="showfuncs"/>
  </div>
</template>

<script>

  import HomeFunc from './homefunc/HomeFunc'
  import {queryJsConfig} from 'network/api/auth2'
  import {getProjects} from 'network/api/pm'

  export default {
    name: 'Home',
    components: {
      HomeFunc
    },
    created() {
      this.getConfig()
    },
    data() {
      return {
        test: null,
        aa: null
      }
    },
    computed: {
      showfuncs() {
        return ['项目管理', '资产管理', '诊断报告提醒']
      },
    },
    methods: {
      Logout() {
        this.$store.dispatch('Logout').then(() => {
          console.log('注销成功');
          location.reload()
        })
      },
      getConfig() {
        let param = {
          debug: true,
          url: 'http://test.windit.com.cn'+ this.$route.path,
          jsApiList: ['scanQRCode']
        }
        queryJsConfig(param).then(response => {
          let obj = Object.assign(param, response.results)
          this.test = response
          wx.config(obj)
          wx.ready(() => {
            
          })
          wx.error(err => {
            
          })
        })
      },
      openScanQrCode() {
        // this.aa += 1;
        let that = this;
        wx.scanQRCode({
          desc: 'scanQRCode desc',
          needResult: 1, // 默认为0，扫描结果由企业微信处理，1则直接返回扫描结果，
          scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是条形码（一维码），默认二者都有
          success: function(res) {
              // 回调
              that.aa = res;
              that.$router.push({path:'/pm'}) 
              
          },
          error: function(res) {
              if (res.errMsg.indexOf('function_not_exist') > 0) {
                  alert('版本过低请升级')
              }
          }
        });
      },
      resultData(res) {
        return new Promise( resolve => {
          alert(JSON.stringify(res))
          resolve()
        })
      }
    }
  }
</script>
<style scoped>
    
</style>