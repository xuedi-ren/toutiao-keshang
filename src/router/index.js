import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    component: () => import('@/views/layout'),
    redirect: '/ ',
    children: [
      {
        path: '/my',
        component: () => import('@/views/my')
      },
      {
        path: '/ ',
        component: () => import('@/views/home')
      },
      {
        path: '/video',
        component: () => import('@/views/video')
      },
      {
        path: '/qa',
        component: () => import('@/views/qa')
      }
    ]
  },
  {
    path: '/search',
    component: () => import('@/views/search')
  },
  {
    path: '/user',
    component: () => import('@/views/user')
  },
  {
    path: '/details',
    component: () => import('@/components/articleDetails')
  }
]

const router = new VueRouter({
  routes
})

export default router
