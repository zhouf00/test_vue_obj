import store from 'store'

const { body } = document
const WIDTH = 1024
const RATIO = 3

export default {
  watch: {
    $route(route) {
      if(this.device === 'mobile' && this.sidebar.opened) {
        console.log('手机');
      }
    }
  },
  beforeMount() {
    window.addEventListener('resize', this.resizeHandler)
  },
  mounted() {
    const isMobile = this._isMobile()
    if (isMobile) {
      console.log(isMobile);
      store.dispatch('ToggleDevice', 'mobile')
      // store.dispatch('CloseSideBar', { withoutAnimation: true })
    }
  },
  methods:{
    _isMobile() {
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag;
    },

    // isMobile() {
    //   const rect = body.getBoundingClientRect()
    //   return rect.width - RATIO < WIDTH
    // },
    resizeHandler() {
      if(!document.hidden) {
        const isMobile = this._isMobile()
        store.dispatch('ToggleDevice', isMobile ? 'mobile' : 'desktop')
      }
    }
  }

}