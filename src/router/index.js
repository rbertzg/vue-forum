import { useCategoriesStore } from '@/stores/CategoriesStore'
import { useForumsStore } from '@/stores/ForumsStore'
import { useThreadsStore } from '@/stores/ThreadsStore'
import HomeView from '@/views/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/category/:id',
    name: 'Category',
    props: true,
    component: () => import('@/views/CategoryView.vue'),
    beforeEnter: (to) => {
      const categoriesStore = useCategoriesStore()
      const categoryExists = categoriesStore.categories.find(
        (category) => category.id === to.params.id
      )
      if (!categoryExists) {
        return {
          name: 'NotFound',
          params: {
            pathMatch: to.path.substring(1).split('/'),
          },
          query: to.query,
          hash: to.hash,
        }
      }
    },
  },
  {
    path: '/forum/:id',
    name: 'Forum',
    props: true,
    component: () => import('@/views/ForumView.vue'),
    beforeEnter: (to) => {
      const forumsStore = useForumsStore()
      const forumExists = forumsStore.forums.find(
        (forum) => forum.id === to.params.id
      )
      if (!forumExists) {
        return {
          name: 'NotFound',
          params: {
            pathMatch: to.path.substring(1).split('/'),
          },
          query: to.query,
          hash: to.hash,
        }
      }
    },
  },
  {
    path: '/thread/:id',
    name: 'Thread',
    props: true,
    component: () => import('@/views/ThreadView.vue'),
    beforeEnter: (to) => {
      const threadsStore = useThreadsStore()
      const threadExists = threadsStore.threads.find(
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
