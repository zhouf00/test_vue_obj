import Cookies from 'js-cookie'

const apps = {
  state: {
    sidebar:{
      opened:!+Cookies.get('sidbarStatus'),
      withoutAnimation:false
    },
    device: 'desktop',
    isMobile: !+Cookies.get('isMobile'),
    NavbarStatus: Cookies.get('NavbarStatus'),
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
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    IS_MOBILE: state => {
      if (state.isMobile) {
        Cookies.set('isMobile', 1)
      } else {
        Cookies.set('isMobile', 0)
      }
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
    ToggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    SetIsMobile({commit},status) {
      commit('IS_MOBILE')
      commit('TOGGLE_DEVICE', status)
    }
  }
}

export default apps;