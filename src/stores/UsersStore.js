import { usePostsStore } from '@/stores/PostsStore'
import { useThreadsStore } from '@/stores/ThreadsStore'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { fetchItem, fetchItems } from '../api'
import { findById } from '../helpers'

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
      const postsCount = posts.length
      const threads = threadsStore.threads.filter(
        (thread) => thread.userId === user.id
      )
      const threadsCount = threads.length

      return {
        ...user,
        posts,
        postsCount,
        threads,
        threadsCount,
      }
    }
  })

  const authUser = computed(() => user.value(authId.value))

  async function fetchUser(id) {
    return await fetchItem('users', id, users.value)
  }

  async function fetchUsers(ids) {
    return await fetchItems('users', ids, users.value)
  }

  return { users, user, authUser, fetchUser, fetchUsers }
})
