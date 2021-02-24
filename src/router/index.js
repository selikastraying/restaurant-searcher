import Vue from 'vue'
import VueRouter from 'vue-router'
import Mapviewer from '../views/Mapviewer.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Mapviewer',
    component: Mapviewer
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
