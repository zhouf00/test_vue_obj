import Cookies from 'js-cookie'

const apps = {
  state: {
    sidebar:{
      opened:!+Cookies.get('sidbarStatus'),
      withoutAnimation:false
    },
    device: 'desktop',
    NavbarStatus: Cookies.get('NavbarStatus'),
    isMobile: Cookies.get('isMobile')
  },
  mutations: {
    SET_NAVBARSTATUS: (state, urlname) => {
      state.NavbarStatus = urlname
      Cookies.set('NavbarStatus', urlname)
    },
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidbarStatus', 1)
      } else {
        Cookies.set('sidbarStatus', 0)
      }
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', 1)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    IS_MOBILE: (state, status) => {
      Cookies.set('isMobile', status)
      state.isMobile = status
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    }
  },
  actions: {
    ChangeNavbar({commit}, urlname) {
      commit('SET_NAVBARSTATUS', urlname)
    },
    ToggleSideBar: ({commit}) => {
      commit('TOGGLE_SIDEBAR')
    },
    CloseSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    SetIsMobile:({commit}, status) => {
      commit('IS_MOBILE', status)
    },
    ToggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    }
  }
}

export default apps;