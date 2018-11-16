import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello.vue'
import FleetStatus from '@/components/FleetStatus.vue'
import Login from '@/components/Login.vue'
import About from '@/components/About.vue'

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
      name: 'FleetStatus',
      component: FleetStatus
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
