import sourceData from '@/data.json'
import { usePostsStore } from '@/stores/PostsStore'
import { useThreadsStore } from '@/stores/ThreadsStore'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { findById, upsert } from '../helpers'

export const useUsersStore = defineStore('UsersStore', () => {
  const postsStore = usePostsStore()
  const threadsStore = useThreadsStore()

  const users = ref(sourceData.users)
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

  function updateUser(updatedUser) {
    upsert(users.value, updatedUser)
  }

  return { users, user, authUser, updateUser }
})
