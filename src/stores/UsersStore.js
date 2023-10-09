import { usePostsStore } from '@/stores/PostsStore'
import { useThreadsStore } from '@/stores/ThreadsStore'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { fetchAllItems, fetchItem, fetchItems } from '../api'
import { docToResource, findById, upsert } from '../helpers'

export const useUsersStore = defineStore('UsersStore', () => {
  const postsStore = usePostsStore()
  const threadsStore = useThreadsStore()

  const users = ref([])
  const authId = ref('VXjpr2WHa8Ux4Bnggym8QFLdv5C3')

  const user = computed(() => {
    return (id) => {
      const user = findById(users.value, id)
      if (!user) return

      const posts = postsStore.posts.filter((post) => post.userId === user.id)
      const threads = threadsStore.threads.filter((thread) => thread.userId === user.id)
      const postsCount = user.postsCount || 0
      const threadsCount = user.threads?.length || 0

      return {
        ...user,
        posts,
        postsCount,
        threads,
        threadsCount,
      }
    }
  })

  const authUser = computed(() => findById(users.value, authId.value) || {})

  const setUser = (user) => upsert(users.value, docToResource(user))
  const fetchUser = (id) => fetchItem('users', id, users.value)
  const fetchAuthUser = () => fetchItem('users', authId.value, users.value)
  const fetchUsers = (ids) => fetchItems('users', ids, users.value)
  const fetchAllUsers = () => fetchAllItems('users', users.value)

  return {
    users,
    user,
    authUser,
    authId,
    setUser,
    fetchUser,
    fetchAuthUser,
    fetchUsers,
    fetchAllUsers,
  }
})
