import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'

import {user, permission, apps} from './modules'

// 安装插件
 Vue.use(Vuex)

 // 创建对象
 const store = new Vuex.Store({
    modules: {
      user,
      permission,
      apps
    },
    actions,
    getters,
    mutations
 })

 // 导出store独享
 export default store