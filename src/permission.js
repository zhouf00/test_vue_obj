import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth' // 验权
import Cookies from 'js-cookie'

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  if(to.meta.title){
    document.title = to.meta.title
  }
  if(to.path === '/home') store.dispatch('ChangeNavbar', '');
  if(getToken()){
    if (to.path === '/login'){
      next({path: '/'})  
      NProgress.done()
    }else{
      if(store.getters.roles.length === 0) {
        store.dispatch('UserInfo').then(res => {
          // 获取菜单和用户名
          let menus = res.results.menus
          let roles = res.results.roles
          // 发送请求生成路由表
          store.dispatch('GenerateRouters', {menus, roles}).then(() => {
            router.addRoutes(store.getters.addRouters);
            next({ ...to, replace:true })
          }).catch(err => {
            console.log(err)
          })
        }).catch(error => {
          console.log(error);
        })
      }else{
        next()
      }
    }
  }else{
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    }else{
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
