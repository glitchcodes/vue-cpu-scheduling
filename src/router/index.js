import { createRouter, createWebHistory } from 'vue-router'
import PriorityNP from "@/views/PriorityNP.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'priority-np',
      component: PriorityNP
    },
    {
      path: '/mqs',
      name: 'mqs',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/MQS.vue')
    }
  ]
})

export default router
