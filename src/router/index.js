import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello.vue'
import Login from '@/components/Login.vue'
import MyAccount from '@/components/MyAccount.vue'
import About from '@/components/About.vue'
import FleetOverview from '@/components/FleetOverview.vue'
import Rankings from '@/components/Rankings.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/app/about',
      name: 'About',
      component: About
    },
    {
      path: '/app/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/app/my-account',
      name: 'MyAccount',
      component: MyAccount
    },
    {
      path: '/app/fleet-overview',
      name: 'FleetOverview',
      component: FleetOverview
    },
    {
      path: '/app/rankings',
      name: 'Rankings',
      component: Rankings
    }
  ]
})
