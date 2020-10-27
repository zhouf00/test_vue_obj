const getters = {
  /*
  * 类计算属性
  */
  sidebar: state => state.apps.sidebar,
  navbarStatus: state => state.apps.NavbarStatus,
  is_mobile: state => state.apps.isMobile,
  id: state => state.user.id,
  name: state => state.user.name,
  avatar: state => state.user.avatar,
  token: state => state.user.token,
  roles: state => state.user.roles,
  addRouters: state => state.permission.addRouters,
  routers: state => state.permission.routers
}

export default getters