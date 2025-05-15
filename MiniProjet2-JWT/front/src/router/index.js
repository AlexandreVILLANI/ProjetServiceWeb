import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginForm from '@/components/LoginForm.vue'
import Dashboard from '@/views/DashboardView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: LoginForm,
    meta: { requiresAuth: false }, // Explicitly mark as public
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('token')
      token ? next('/dashboard') : next() // Redirect if logged in
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

// Global navigation guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token) {
      next('/')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router