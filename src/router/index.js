import Vue from 'vue'
import VueRouter from 'vue-router'
import {getToken} from 'utils/auth'
import Layout from 'views/layout/Layout'

Vue.use(VueRouter)

export const constantRouterMap = [
  {path: '/login', component: () => import('views/login/index'), hidden: true},
  {path: '/404', component: () => import('views/404'), hidden: true},
  {
    path: '',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('views/home/Home'),
      meta:{
        title: '首页',
      }
    }]
  },
]

export const asyncRouterMap = [
  {
    path: '/pm',
    component: Layout,
    redirect: '/pm',
    children:[
      {
        path: '',
        name: 'PM',
        component: () => import('views/pm/PM'),
        meta: {title: '项目管理'}
      },
      {
        path: 'detail/:name',
        name: 'detail',
        component: () => import('views/pm/detail/Detail'),
        meta: { title: '项目详情'}
      }
    ]
  },
  {
    path: '/ams',
    component: Layout,
    redirect: '/ams',
    children:[
      {
        path: '',
        name: 'AMS',
        // component: () => import('views/test/Test'),
        meta: {title: '资产管理'}
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    children:[
      {
        path: '',
        name: 'profile',
        component: () => import('views/profile/Profile')
      }
    ]
  },
  {
    path: '/task',
    component: Layout,
    children:[
      {
        path: '',
        name: 'task',
        component: () => import('views/task/Task')
      }
    ]
  },
  {
    path: '/admin',
    component: () => import('views/test/Test'),
    name: 'admin',
    meta: {title:'管理界面'}
  }
]

const router = new VueRouter({
  routes: constantRouterMap,
  mode: 'history',
  linkActiveClass: 'active',
  // 滚动设置
  scrollBehavior: () => ({y:0})
})

export default router