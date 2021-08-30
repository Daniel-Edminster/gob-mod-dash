import { createRouter, createWebHistory } from 'vue-router'
import HelpMe from '../views/HelpMe.vue'
import Home from '../views/Home.vue'
import Rounds from "../views/Rounds"
import Round from "../views/Round"
import Settings from "../views/Settings"
import Templates from "../views/Templates"
import Template from "../views/Template"
import Login from "../views/Login"
import Auth from "../views/Auth"

import store from "@/store"

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/rounds',
    name: 'Rounds',
    component: Rounds,
    meta: { requiresAuth: true }
  },
  {
    path: '/rounds/:id',
    name: 'Round',
    props: true,
    component: Round,
    meta: { requiresAuth: true }
  },
  {
    path: '/templates',
    name: 'Templates',
    component: Templates,
    meta: { requiresAuth: true }
  },
  {
    path: '/templates/:name',
    name: 'Template',
    props: true,
    component: Template,
    meta: { requiresAuth: true }
  },
  {
    path: '/help',
    name: 'Help',
    component: HelpMe,
    meta: { requiresAuth: true }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: { requiresAuth: true }
  },
  {
     path: '/login',
     name: 'Login',
     component: Login,
     meta: { requiresAnon: true }
  },
  {
     path: '/auth',
     name: 'auth',
     component: Auth,
     meta: { requiresAnon: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(function(to, _, next) {
   if (to.meta.requiresAuth && !store.getters["auth/isAuthenticated"]) {
      next('/login');
   } else if (to.meta.requiresAnon && store.getters["auth/isAuthenticated"]) {
      next('/')
   } else {
      next();
   }
})

export default router
