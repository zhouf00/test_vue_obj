import Vue from 'vue'
import VueRouter from 'vue-router'
import {
  getToken
} from 'utils/auth'
import Layout from 'views/layout/Layout'
import WebLayout from 'views/web/webLayout/WebLayout'

Vue.use(VueRouter)

export const constantRouterMap = [{
  path: '/login',
  component: () => import('views/login/index'),
  hidden: true
},
{
  path: '/404',
  component: () => import('views/404'),
  hidden: true
},

]

export const asyncRouterMap = [
  {
    path: '',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('views/home/Home'),
      meta: {
        title: '首页',
        icon: 'el-icon-s-home'
      }
    }]
  },
{
  path: '/pm',
  component: Layout,
  redirect: '/pm',
  name: 'PM',
  meta: {
    title: '项目管理',
    icon: 'el-icon-s-claim'
  },
  children: [{
    path: '',
    name: 'project',
    component: () => import('views/pm/PM'),
    meta: {
      title: '项目列表',
    }
  },
  {
    path: 'detail/:name',
    name: 'detail',
    component: () => import('views/pm/detail/Detail'),
    meta: {
      title: '项目详情'
    },
    hidden: true
  },
  {
    path: 'addProject',
    name: 'addProject',
    meta: {
      title: '添加项目'
    }
  },
  {
    path: 'overview',
    name: 'overview',
    meta: {
      title: '总览'
    }
  }
  ]
},
{
  path: '/ams',
  component: Layout,
  redirect: '/ams',
  children: [{
    path: '',
    name: 'AMS',
    // component: () => import('views/test/Test'),
    meta: {
      title: '资产管理'
    }
  }]
},
{
  path: '/profile',
  component: Layout,
  children: [{
    path: '',
    name: 'profile',
    component: () => import('views/profile/Profile'),
    meta: {
      title: '个人中心'
    }
  }]
},
{
  path: '/task',
  component: Layout,
  children: [{
    path: '',
    name: 'task',
    component: () => import('views/task/Task'),
    meta: {
      title: '任务管理'
    }
  }]
},
]

export const asyncWebRouterMap = [
  {
    path: '',
    component: WebLayout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'webHome',
      component: () => import('views/web/home'),
      meta: {
        title: '网页管理',
        icon: 'el-icon-s-home'
      }
    }]
  },
  {
    path: '/pm',
    component: WebLayout,
    redirect: '/pm',
    name: 'PM',
    meta: {
      title: '项目管理',
      icon: 'el-icon-s-claim'
    },
    children: [
      {
        path: 'overview',
        name: 'overview',
        component: () => import('views/web/pm/projectList/overview'),
        meta: {
          title: '总览',
          icon: 'el-icon-folder-add'
        }
      },
      {
        path: '',
        name: 'project',
        component: () => import('views/web/pm/projectList'),
        meta: {
          title: '项目列表',
          icon: 'el-icon-folder'
        }
      },
      {
        path: 'addProject',
        name: 'addProject',
        component: () => import('views/web/pm/projectList/add'),
        meta: {
          title: '添加项目',
          icon: 'el-icon-folder-add'
        }
      },
      {
        path: 'updateProject',
        name: 'updateProject',
        component: () => import('views/web/pm/projectList/update'),
        meta: {
          title: '修改项目',
          icon: 'el-icon-folder-add'
        },
        hidden: true
      },
      {
        path: 'showProject',
        name: 'showProject',
        component: () => import('views/web/pm/project'),
        meta: {
          title: '查看项目',
          icon: 'el-icon-folder-show'
        },
        hidden: true
      },
    ]
  },
  {
    path: '/product',
    component: WebLayout,
    redirect: '/product',
    meta: {
      title: '产品目录',
      icon: 'el-icon-s-claim'
    },
    children: [
      {
        path: 'publishProduct',
        name: 'publishProduct',
        meta: {
          title: '产品库',
          icon: 'el-icon-box'
        },
        component: () => import('views/web/pms/productAttr'),
      },
      {
        path: '',
        name: 'product',
        meta: {
          title: '生产记录',
          icon: 'el-icon-collection-tag'
        }
      },
    ]
  },
  {
    path: '/sales',
    component: WebLayout,
    redirect: '/sales',
    name: 'SALES',
    meta: {
      title: '销售管理',
      icon: 'el-icon-s-claim'
    },
    children: [
      {
        path: '',
        meta: {
          title: '信息展示',
          icon: 'el-icon-collection-tag'
        },
        component: () => import('views/web/sales/'),
      },
      {
        path: 'aa',
        meta: {
          title: 'aa',
          icon: 'el-icon-collection-tag'
        },
      }
    ]
  },
  {
    path: '/ams',
    component: WebLayout,
    redirect: '/ams',
    children: [{
      path: '',
      name: 'AMS',
      meta: {
        title: '资产管理',
        icon: 'el-icon-collection-tag'
      }
    }]
  },
  {
    path: '/profile',
    component: WebLayout,
    children: [{
      path: '',
      name: 'profile',
      // component: () => import('views/profile/Profile'),
      meta: {
        title: '个人中心'
      },
    }],
    hidden: true
  },
  {
    path: '/task',
    component: WebLayout,
    children: [{
      path: '',
      name: 'task',
      // component: () => import('views/task/Task'),
      meta: {
        title: '任务管理',
        icon: 'el-icon-collection-tag'
      }
    }]
  },
  {
    path: '/ums',
    component: WebLayout,
    name: 'ums',
    meta: {
      title: '系统管理',
      icon: 'el-icon-setting'
    },
    children: [
      {
        path: 'user',
        name: 'user',
        component: () => import('views/web/ums/user'),
        meta: {
          title: '用户管理',
          icon: 'el-icon-user'
        }
      },
      {
        path: 'rbac',
        name: 'rbac',
        component: () => import('views/web/ums/rbac'),
        meta: {
          title: '权限管理',
          icon: 'el-icon-s-custom'
        }
      },
      {
        path: 'department',
        name: 'department',
        component: () => import('views/web/ums/department'),
        meta: {
          title: '组织结构',
          icon: 'el-icon-office-building'
        }
      },
      {
        path: 'menu',
        name: 'menu',
        component: () => import('views/web/ums/menu'),
        meta: {
          title: '菜单列表',
          icon: 'el-icon-menu'
        }
      },
    ]
  },
]

const router = new VueRouter({
  routes: constantRouterMap,
  mode: 'history',
  linkActiveClass: 'active',
  // 滚动设置
  scrollBehavior: () => ({
    y: 0
  })
})

export default router