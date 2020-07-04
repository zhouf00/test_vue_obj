import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/home/Home')
const Profile = () => import('views/profile/Profile')
const Test = () => import('views/test/Test')

// const Auth2 = () => import('components/common/login/Login')

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/test',
    component: Test
  },
  // {
  //   path: '/login',
  //   component: Auth2
  // }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router