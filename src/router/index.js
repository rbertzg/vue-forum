import sourceData from '@/data.json'
import HomeView from '@/views/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/thread/:id',
    name: 'Thread',
    props: true,
    component: () => import('@/views/ThreadView.vue'),
    beforeEnter: (to) => {
      const threadExists = sourceData.threads.find(
        (thread) => thread.id === to.params.id
      )
      if (!threadExists) {
        return {
          name: 'NotFound',
          // preserve current path and remove the first char to avoid the target URL starting with `//`
          params: {
            pathMatch: to.path.substring(1).split('/'),
          },
          // preserve existing query and hash
          query: to.query,
          hash: to.hash,
        }
      }
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
