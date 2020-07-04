 import Vue from 'vue'
 import Vuex from 'vuex'

 import actions from './actions'
 import getters from './getters'
 import mutations from './mutations'

// 安装插件
 Vue.use(Vuex)

 // 创建对象
 const store = new Vuex.Store({
    state: {
      appid: 'wwa84b8b2c3e83d6e0',
      Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
      url: 'test.windit.com.cn'

    },
    actions,
    getters,
    mutations
 })

 // 导出store独享
 export default store