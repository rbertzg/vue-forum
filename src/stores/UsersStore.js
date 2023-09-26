import sourceData from '@/data.json'
import { usePostsStore } from '@/stores/PostsStore'
import { useThreadsStore } from '@/stores/ThreadsStore'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useUsersStore = defineStore('UsersStore', () => {
  const postsStore = usePostsStore()
  const threadsStore = useThreadsStore()

  const users = ref(sourceData.users)

  const authUser = computed(() => {
    const user = users.value.find(
      (user) => user.id === 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3'
    )
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
  })

  function updateUser(updatedUser) {
    const userId = users.value.findIndex((user) => user.id === updatedUser.id)
    if (userId > -1) {
      users.value[userId] = updatedUser
    }
  }

  return { users, authUser, updateUser }
})
