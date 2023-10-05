import { useThreadsStore } from '@/stores/ThreadsStore'
import { useUsersStore } from '@/stores/UsersStore'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchAllItems, fetchItem, fetchItems } from '../api'
import { findById } from '../helpers'

export const usePostsStore = defineStore('PostsStore', () => {
  const posts = ref([])

  function createPost(post) {
    const usersStore = useUsersStore()
    const threadsStore = useThreadsStore()

    const thread = findById(threadsStore.threads, post.threadId)
    post.id = 'post' + Math.random()
    post.userId = usersStore.authId
    post.publishedAt = Math.floor(Date.now() / 1000)

    posts.value.push(post)
    thread.posts.push(post.id)
  }

  async function fetchPost(id) {
    return await fetchItem('posts', id, posts.value)
  }

  async function fetchPosts(ids) {
    return await fetchItems('posts', ids, posts.value)
  }

  async function fetchAllPosts() {
    return await fetchAllItems('posts', posts.value)
  }

  return { posts, createPost, fetchPost, fetchPosts, fetchAllPosts }
})
