const getters = {
  /*
  * 类计算属性
  */
  sidebar: state => state.apps.sidebar,
  isMobile: state => state.apps.isMobile,
  navbarStatus: state => state.apps.NavbarStatus,
  name: state => state.user.name,
  avatar: state => state.user.avatar,
  token: state => state.user.token,
  roles: state => state.user.roles,
  addRouters: state => state.permission.addRouters,
  routers: state => state.permission.routers
}

export default getters