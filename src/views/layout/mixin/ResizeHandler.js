import store from 'store'

const { body } = document
const WIDTH = 1024
const RATIO = 3

export default {
  watch: {
    $route(route) {
      // console.log(body.getBoundingClientRect());
    }
  },
  mounted() {
    // const isMobile = store.getters.isMobile
    // if (!+isMobile) {
    //   console.log('webHome');
    //   this.$router.push({path:'/web'})
    // }
  },
  methods: {

  }
}