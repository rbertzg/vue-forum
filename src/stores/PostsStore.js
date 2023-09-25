import sourceData from '@/data.json'
import { useThreadsStore } from '@/stores/ThreadsStore'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePostsStore = defineStore('PostsStore', () => {
  const posts = ref(sourceData.posts)

  function createPost(post) {
    post.id = 'post' + Math.random()
    posts.value.push(post)

    const threadsStore = useThreadsStore()
    const thread = threadsStore.threads.find(
      (thread) => thread.id === post.threadId
    )
    thread.posts.push(post.id)
  }

  return { posts, createPost }
})
