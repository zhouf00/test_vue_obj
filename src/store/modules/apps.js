import Cookies from 'js-cookie'

const app = {
  state: {
    NavbarStatus: Cookies.get('NavbarStatus')
  },
  mutations: {
    SET_NAVBARSTATUS: (state, urlname) => {
      state.NavbarStatus = urlname
      Cookies.set('NavbarStatus', urlname)
    }
  },
  actions: {
    ChangeNavbar({commit}, urlname) {
      commit('SET_NAVBARSTATUS', urlname)
    }
  }
}

export default app;