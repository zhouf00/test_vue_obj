import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/home/Home')
const Profile = () => import('views/profile/Profile')
const Test = () => import('views/test/Test')
const Auth2 = () => import('views/login/')

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
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router