import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth' // 验权

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
        // console.log(store.state.user,'获取');    
        store.dispatch('UserInfo').then(res => {
          // 获取菜单和用户名
          let menus = res.results.menus
          let roles = res.results.roles
          let is_modile = store.getters.is_mobile
          // 发送请求生成路由表
          store.dispatch('GenerateRouters', {menus, roles, is_modile}).then(() => {
            router.addRoutes(store.getters.addRouters);
            next({ ...to, replace:true })
          })
        }).catch(error => {
          console.log(error);
          store.dispatch('FedLogOut').then(() => {
            // Message.error(err || 'Verification failed, please login again')
            next({ path: '/' })
          })
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
