import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/a.vue'
import records from '../views/records.vue'
import complaint from '../views/complaint.vue'
import print from '../views/print.vue'
import patients from '../views/patients.vue'
import profile from '../views/profile.vue'

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
    component:complaint
  },
  {
    path: '/patients',
    name: 'patients',
    component:patients
  },
  {
    path: '/profile/:id',
    name: 'profile',
    component:profile
  },
  {
    path: '/print',
    name: 'print',
    component:print
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
