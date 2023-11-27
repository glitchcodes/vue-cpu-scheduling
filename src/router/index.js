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
      component: () => import('../views/MQS.vue')
    },
    {
      path: '/sstf',
      name: 'sstf',
      component: () => import('../views/SSTF.vue')
    }
  ]
})

export default router
