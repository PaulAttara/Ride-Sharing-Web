import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import RideSharing from '@/components/RideSharing'
import Login from '@/components/Login'

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
      name: 'RideSharing',
      component: RideSharing
    },
    {
      path: '/app/passenger',
      name: 'RideSharing',
      component: RideSharing
    },
    {
      path: '/app/driver',
      name: 'RideSharing',
      component: RideSharing
    }
  ]
})
