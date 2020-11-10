import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Rounds from "../views/Rounds"
import Round from "../views/Round"

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/rounds',
    name: 'Rounds',
    component: Rounds
  },
  {
    path: '/rounds/:id',
    name: 'Round',
    props: true,
    component: Round
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
