import sourceData from '@/data.json'
import { useForumsStore } from '@/stores/ForumsStore'
import { usePostsStore } from '@/stores/PostsStore'
import { useUsersStore } from '@/stores/UsersStore'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThreadsStore = defineStore('ThreadsStore', () => {
  const threads = ref(sourceData.threads)

  async function createThread(thread, text) {
    const postsStore = usePostsStore()
    const usersStore = useUsersStore()
    const forumsStore = useForumsStore()

    thread.id = 'thread' + Math.random()
    thread.userId = usersStore.authUser.id
    thread.publishedAt = Math.floor(Date.now() / 1000)
    thread.posts = []
    threads.value.push(thread)

    // append post to thread
    const firstPost = {
      text,
      threadId: thread.id,
    }
    postsStore.createPost(firstPost)

    // append thread to forum
    const forum = forumsStore.forums.find(
      (forum) => forum.id === thread.forumId
    )
    forum.threads = forum.threads || []
    forum.threads.push(thread.id)

    // append thread to user
    const user = usersStore.users.find((user) => user.id === thread.userId)
    user.threads = user.threads || []
    user.threads.push(thread.id)

    return thread
  }

  async function updateThread(id, title, text) {
    const postsStore = usePostsStore()
    const thread = threads.value.find((thread) => thread.id === id)
    const post = postsStore.posts.find((post) => post.id === thread.posts[0])

    thread.title = title
    post.text = text

    return thread
  }

  return { threads, createThread, updateThread }
})
