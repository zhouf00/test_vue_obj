const getters = {
  /*
  * 类计算属性
  */
  navbarStatus: state => state.apps.NavbarStatus,
  name: state => state.user.name,
  token: state => state.user.token,
  roles: state => state.user.roles,
  addRouters: state => state.permission.addRouters,
  routers: state => state.permission.routers
}

export default getters