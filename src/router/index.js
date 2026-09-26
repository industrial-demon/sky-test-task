import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'products',
    component: () => import('../views/ProductsView.vue'),
  },
  {
    path: '/history',
    name: 'history',
    component: () => import('../views/HistoryView.vue'),
  },
    {
    path: '/low-stock',
    name: 'low-stock',
    component: () => import('../views/LowStockProducts.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
