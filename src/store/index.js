import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'

import user from './modules/user'


// 安装插件
 Vue.use(Vuex)

 // 创建对象
 const store = new Vuex.Store({
    modules: {
      user
    },
    actions,
    getters,
    mutations
 })

 // 导出store独享
 export default store