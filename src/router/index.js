import HomeView from '@/views/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { useThreadsStore } from '../stores/ThreadsStore'
import { useUnsubscribesStore } from '../stores/UnsubscribesStore'
import { useUsersStore } from '../stores/UsersStore'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/RegisterView.vue'),
    meta: { requiresGuest: true },
  },
  {
    path: '/sign-in',
    name: 'SignIn',
    component: () => import('@/views/SignInView.vue'),
    meta: { requiresGuest: true },
  },
  {
    path: '/logout',
    name: 'SignOut',
    beforeEnter: async () => {
      const usersStore = useUsersStore()
      await usersStore.signOut()
      return { name: 'Home' }
    },
  },
  {
    path: '/me',
    name: 'Profile',
    component: () => import('@/views/ProfileView.vue'),
    meta: { toTop: true, smoothScroll: true, requiresAuth: true },
  },
  {
    path: '/me/edit',
    name: 'ProfileEdit',
    props: { edit: true },
    component: () => import('@/views/ProfileView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/category/:id',
    name: 'Category',
    props: true,
    component: () => import('@/views/CategoryView.vue'),
  },
  {
    path: '/forum/:id',
    name: 'Forum',
    props: true,
    component: () => import('@/views/ForumView.vue'),
  },
  {
    path: '/thread/:id',
    name: 'Thread',
    props: true,
    component: () => import('@/views/ThreadView.vue'),
    beforeEnter: async (to) => {
      const threadsStore = useThreadsStore()
      const threadExists = await threadsStore.fetchThread(to.params.id)
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
    path: '/thread/:id/edit',
    name: 'ThreadEdit',
    props: true,
    component: () => import('@/views/ThreadEditView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/forum/:forumId/thread/create',
    name: 'ThreadCreate',
    props: true,
    component: () => import('@/views/ThreadCreateView.vue'),
    meta: { requiresAuth: true },
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

router.beforeEach(async (to) => {
  const usersStore = useUsersStore()
  await usersStore.initAuthentication()

  const unsubscribesStore = useUnsubscribesStore()
  unsubscribesStore.unsubscribeAllSnapshots()

  if (to.meta.requiresAuth && !usersStore.authId) {
    return { name: 'SignIn', query: { redirectTo: to.path } }
  }

  if (to.meta.requiresGuest && usersStore.authId) {
    return { name: 'Home' }
  }
})

export default router
