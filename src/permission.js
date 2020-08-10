import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()

})

router.afterEach(() => {
  NProgress.done()
})