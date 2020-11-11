import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Rounds from "../views/Rounds"
import Round from "../views/Round"
import Templates from "../views/Templates"
import Template from "../views/Template"

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
  },
  {
    path: '/templates',
    name: 'Templates',
    component: Templates
  },
  {
    path: '/templates/:name',
    name: 'Template',
    props: true,
    component: Template
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
