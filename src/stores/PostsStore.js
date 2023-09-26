import sourceData from '@/data.json'
import { useThreadsStore } from '@/stores/ThreadsStore'
import { useUsersStore } from '@/stores/UsersStore'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePostsStore = defineStore('PostsStore', () => {
  const posts = ref(sourceData.posts)

  function createPost(post) {
    const usersStore = useUsersStore()
    const threadsStore = useThreadsStore()
    const thread = threadsStore.threads.find(
      (thread) => thread.id === post.threadId
    )
    post.id = 'post' + Math.random()
    post.userId = usersStore.authUser.id
    post.publishedAt = Math.floor(Date.now() / 1000)

    posts.value.push(post)
    thread.posts.push(post.id)
  }

  return { posts, createPost }
})
