import HomeView from '@/views/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { useUnsubscribesStore } from '../stores/UnsubscribesStore'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/me',
    name: 'Profile',
    component: () => import('@/views/ProfileView.vue'),
    meta: { toTop: true, smoothScroll: true },
  },
  {
    path: '/me/edit',
    name: 'ProfileEdit',
    component: () => import('@/views/ProfileView.vue'),
    props: { edit: true },
  },
  {
    path: '/category/:id',
    name: 'Category',
    props: true,
    component: () => import('@/views/CategoryView.vue'),
    // beforeEnter: (to) => {
    //   const categoriesStore = useCategoriesStore()
    //   const categoryExists = findById(categoriesStore.categories, to.params.id)
    //   if (!categoryExists) {
    //     return {
    //       name: 'NotFound',
    //       params: {
    //         pathMatch: to.path.substring(1).split('/'),
    //       },
    //       query: to.query,
    //       hash: to.hash,
    //     }
    //   }
    // },
  },
  {
    path: '/forum/:id',
    name: 'Forum',
    props: true,
    component: () => import('@/views/ForumView.vue'),
    // beforeEnter: (to) => {
    //   const forumsStore = useForumsStore()
    //   const forumExists = findById(forumsStore.forums, to.params.id)
    //   if (!forumExists) {
    //     return {
    //       name: 'NotFound',
    //       params: {
    //         pathMatch: to.path.substring(1).split('/'),
    //       },
    //       query: to.query,
    //       hash: to.hash,
    //     }
    //   }
    // },
  },
  {
    path: '/thread/:id',
    name: 'Thread',
    props: true,
    component: () => import('@/views/ThreadView.vue'),
    // beforeEnter: (to) => {
    //   const threadsStore = useThreadsStore()
    //   const threadExists = findById(threadsStore.threads, to.params.id)

    //   if (!threadExists) {
    //     return {
    //       name: 'NotFound',
    //       // preserve current path and remove the first char to avoid the target URL starting with `//`
    //       params: {
    //         pathMatch: to.path.substring(1).split('/'),
    //       },
    //       // preserve existing query and hash
    //       query: to.query,
    //       hash: to.hash,
    //     }
    //   }
    // },
  },
  {
    path: '/thread/:id/edit',
    name: 'ThreadEdit',
    props: true,
    component: () => import('@/views/ThreadEditView.vue'),
  },
  {
    path: '/forum/:forumId/thread/create',
    name: 'ThreadCreate',
    props: true,
    component: () => import('@/views/ThreadCreateView.vue'),
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
  scrollBehavior(to) {
    const scroll = {}
    if (to.meta.toTop) scroll.top = 0
    if (to.meta.smoothScroll) scroll.behavior = 'smooth'
    return scroll
  },
})

router.beforeEach(() => {
  const unsubscribesStore = useUnsubscribesStore()
  unsubscribesStore.unsubscribeAllSnapshots()
})

export default router
