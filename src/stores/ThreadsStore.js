import { useForumsStore } from '@/stores/ForumsStore'
import { usePostsStore } from '@/stores/PostsStore'
import { useUsersStore } from '@/stores/UsersStore'
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { fetchAllItems, fetchItem, fetchItems } from '../api'
import { docToResource, findById, upsert } from '../helpers'
import { useAuthStore } from './AuthStore'

export const useThreadsStore = defineStore('ThreadsStore', () => {
  const usersStore = useUsersStore()
  const authStore = useAuthStore()
  const postsStore = usePostsStore()
  const forumsStore = useForumsStore()
  const db = getFirestore()

  const threads = ref([])

  // it is not cached
  const thread = computed(() => {
    return (id) => {
      const thread = findById(threads.value, id)
      if (!thread) return {}
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

  async function createThread({ title, text, forumId }) {
    const userId = authStore.authId
    const publishedAt = serverTimestamp()

    const threadRef = doc(collection(db, 'threads'))
    const thread = {
      id: threadRef.id,
      title,
      forumId,
      publishedAt,
      userId,
    }
    const userRef = doc(db, 'users', userId)
    const forumRef = doc(db, 'forums', forumId)

    await writeBatch(db)
      .set(threadRef, thread)
      .update(userRef, {
        threads: arrayUnion(threadRef.id),
      })
      .update(forumRef, {
        threads: arrayUnion(threadRef.id),
      })
      .commit()

    const newThread = await getDoc(threadRef)

    upsert(threads.value, { ...newThread.data(), id: newThread.id })

    const user = findById(usersStore.users, newThread.userId)
    if (user) {
      user.threads = user.threads || []
      upsert(user.threads, newThread.id)
    }

    const forum = findById(forumsStore.forums, newThread.forumId)
    if (forum) {
      forum.threads = forum.threads || []
      upsert(forum.threads, newThread.id)
    }

    await postsStore.createPost({ text, threadId: newThread.id })

    return findById(threads.value, newThread.id)
  }

  async function updateThread(id, title, text) {
    const thread = findById(threads.value, id)
    const post = findById(postsStore.posts, thread.posts[0])

    const threadRef = doc(db, 'threads', id)
    const postRef = doc(db, 'posts', post.id)

    let newThread = {
      ...thread,
      title,
    }
    let newPost = {
      ...post,
      text,
    }

    await writeBatch(db).update(threadRef, newThread).update(postRef, newPost).commit()

    newThread = await getDoc(threadRef)
    newPost = await getDoc(postRef)

    setThread(newThread)
    postsStore.setPost(newPost)

    return docToResource(newThread)
  }

  const setThread = (thread) => upsert(threads.value, docToResource(thread))
  const fetchThread = (id) => fetchItem('threads', id, threads.value)
  const fetchThreads = (ids) => fetchItems('threads', ids, threads.value)
  const fetchAllThreads = () => fetchAllItems('threads', threads.value)

  return {
    threads,
    thread,
    setThread,
    createThread,
    updateThread,
    fetchThread,
    fetchThreads,
    fetchAllThreads,
  }
})
