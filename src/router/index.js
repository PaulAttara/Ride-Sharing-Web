import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import RideSharing from '@/components/RideSharing'
import Login from '@/components/Login'
import About from '@/components/About'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/app',
      name: 'RideSharing',
      component: RideSharing
    },
    {
      path: '/app/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/app/about',
      name: 'About',
      component: About
    }
  ]
})
