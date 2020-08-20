import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/a.vue'
import records from '../views/records.vue'
import complaint from '../views/complaint.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: home
  },
  {
    path: '/records',
    name: 'records',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component:records
  },
  {
    path: '/complaint',
    name: 'complaint',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component:complaint
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
