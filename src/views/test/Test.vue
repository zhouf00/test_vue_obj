<!-- 测试页 -->
<template>
  <div>
    <el-button @click="openscan">扫码</el-button>
    <iframe :src="url2"
      scrolling="no" width="300" height="400" frameBorder="0" allowTransparency="true" ></iframe>
  </div>
  
</template>

<script>
  import login from 'network/login'
  import VueWxlogin from 'vue-wxlogin'

  export default {
    name: 'Test',
    components:{ 
      VueWxlogin
    },
    data() {
      return {
        radio:3,
        radio1: '上海',
        url1: "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wwa84b8b2c3e83d6e0&redirect_uri=test.windit.com.cn/profile&\
    response_type=1000007&scope=snsapi_base&state=STATE#wechat_redirect'",
        url2:'https://open.work.weixin.qq.com/wwopen/sso/qrConnect?appid=wwa84b8b2c3e83d6e0&agentid=1000007&redirect_uri=http%3A%2F%2Ftest.windit.com.cn/profile&state=STATE'
      }
    },
    methods:{
      openscan(){
        wx.scanQRCode({
          desc: 'scanQRCode desc',
          needResult: 1,
          scanType: ["qyCode","barCode"],
          success:function(){

          },
          error: function(){
            if(res.errMsg.indexOf('function_not_exist') > 0){
              alert('版本过低请升级')
            }
          }
        })
      }
    }
    
  }
</script>

<style>
  
</style>