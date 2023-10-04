import { useForumsStore } from '@/stores/ForumsStore'
import { usePostsStore } from '@/stores/PostsStore'
import { useUsersStore } from '@/stores/UsersStore'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { fetchItem, fetchItems } from '../api'
import { findById, upsert } from '../helpers'

export const useThreadsStore = defineStore('ThreadsStore', () => {
  const usersStore = useUsersStore()
  const threads = ref([])

  // it is not cached
  const thread = computed(() => {
    return (id) => {
      const thread = findById(threads.value, id)
      if (!thread) return null
      return {
        ...thread,
        get author() {
          return findById(usersStore.users, thread.userId)
        },
        get repliesCount() {
          return thread.posts.length - 1 || 0
        },
        get contributorsCount() {
          return thread.contributors.length
        },
      }
    }
  })

  async function createThread(thread, text) {
    const postsStore = usePostsStore()
    const usersStore = useUsersStore()
    const forumsStore = useForumsStore()

    thread.id = 'thread' + Math.random()
    thread.userId = usersStore.authUser.id
    thread.publishedAt = Math.floor(Date.now() / 1000)
    thread.posts = []
    thread.contributors = []
    const authUserId = usersStore.authUser.id
    if (!thread.contributors.includes(authUserId)) {
      thread.contributors.push(authUserId)
    }
    upsert(threads.value, thread)

    // append post to thread
    const firstPost = {
      text,
      threadId: thread.id,
    }
    postsStore.createPost(firstPost)

    // append thread to forum
    const forum = findById(forumsStore.forums, thread.forumId)
    forum.threads = forum.threads || []
    forum.threads.push(thread.id)

    // append thread to user
    const user = findById(usersStore.users, thread.userId)
    user.threads = user.threads || []
    user.threads.push(thread.id)

    return thread
  }
  async function updateThread(id, title, text) {
    const postsStore = usePostsStore()

    const thread = findById(threads.value, id)
    const post = findById(postsStore.posts, thread.posts[0])

    const updatedThread = {
      ...thread,
      title: title,
    }
    const updatedPost = {
      ...post,
      text: text,
    }
    upsert(threads.value, updatedThread)
    upsert(postsStore.posts, updatedPost)

    return thread
  }

  async function fetchThread(id) {
    return await fetchItem('threads', id, threads.value)
  }

  async function fetchThreads(ids) {
    return await fetchItems('threads', ids, threads.value)
  }

  return {
    threads,
    thread,
    createThread,
    updateThread,
    fetchThread,
    fetchThreads,
  }
})
