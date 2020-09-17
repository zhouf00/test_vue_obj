import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'

import 'assets/css/theme/index.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/permission'
import 'utils/jweixin-1.2.0.js'


Vue.config.productionTip = false
Vue.prototype.$store = store

Vue.use(ElementUI)

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  // template: '<App/>',
  // components: {App}
})
