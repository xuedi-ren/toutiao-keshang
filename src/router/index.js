import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    path: '/layout',
    component: () => import('@/views/layout'),
    redirect: '/layout/profile',
    children: [
      {
        path: 'profile',
        component: () => import('@/views/profile')
      },
      {
        path: 'home',
        component: () => import('@/views/home')
      },
      {
        path: 'video',
        component: () => import('@/views/video')
      },
      {
        path: 'q1',
        component: () => import('@/views/q1')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
