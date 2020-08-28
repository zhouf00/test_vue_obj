import {asyncRouterMap, asyncWebRouterMap, constantRouterMap} from '@/router/index'

// 判断是否有权限访问
function hasPermission (menus, route) {
  if (route.name) {
    let currMenu = getMenu(route.name, menus)
    if (currMenu != null) {
      // 设置菜单的标题、图标和可见性
      if (currMenu.title != null && currMenu.title !== '') {
        route.meta.title = currMenu.title
      }
      if (currMenu.icon != null && currMenu.icon !== '') {
        route.meta.icon = currMenu.icon
      }
      if (currMenu.hidden != null) {
        route.hidden = currMenu.hidden !== 0
      }
      if (currMenu.sort != null && currMenu.sort !== '') {
        route.sort = currMenu.sort
      }
      return true
    } else {
      route.sort = 0
      if (route.hidden !== undefined && route.hidden === true) {
        return true;
      } else {
        return false;
      }
    }
  } else {
    return true
  }
}
// 根据路由名称获取菜单
function getMenu(name, menus) {
  for (let i in menus) {
    let menu = menus[i];
    if (name === menu){
      return menu;
    }
  }
  return null;
}

// 对菜单进行排序
function sortRouters(accessedRouters) {
  for (let i in accessedRouters) {
    let router = accessedRouters[i]
    if(router.children && router.children.length > 0){
      router.children.sort(compare("sort"));
    }
  }
  accessedRouters.sort(compare("sort"))
}

// 降序比较函数
function compare(p) {
  return function(m, n) {
    let a = m[p]
    let b = n[p]
    return b - a
  }
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRouters({commit}, data) {
      return new Promise(resolve => {
        const { menus, is_mobile } = data
        let access = ''
        let newRouterMap = ''
        for (let index in data.roles) {
          if ('管理员' === data.roles[index].title) {
            access = true
          }
        }
        if(is_mobile) {
          newRouterMap = asyncRouterMap
          console.log('手机');
        } else {
          newRouterMap = asyncWebRouterMap
        }
        const accessedRouters = newRouterMap.filter(v => {
          if(access) return true;  // 管理员则全部权限
          if (hasPermission(menus, v)) {
            if (v.children && v.children.length > 0) {
              v.children = v.children.filter(child => {
                if(hasPermission(menus, child)) {
                  return child
                }
                return false;
              })
              return v
            } else {
              return v
            }
          }
          return false
        })
        sortRouters(accessedRouters);
        commit('SET_ROUTERS', accessedRouters);
        resolve();
      })
    }
  }
}

export default permission;