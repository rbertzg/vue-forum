import { useThreadsStore } from '@/stores/ThreadsStore'
import { useUsersStore } from '@/stores/UsersStore'
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getFirestore,
  increment,
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchAllItems, fetchItem, fetchItems } from '../api'
import { findById, upsert } from '../helpers'

export const usePostsStore = defineStore('PostsStore', () => {
  const posts = ref([])

  async function createPost(post) {
    const usersStore = useUsersStore()
    const threadsStore = useThreadsStore()
    const db = getFirestore()

    post.userId = usersStore.authId
    post.publishedAt = serverTimestamp()

    const postRef = doc(collection(db, 'posts'))
    const threadRef = doc(db, 'threads', post.threadId)
    const userRef = doc(db, 'users', usersStore.authId)
    await writeBatch(db)
      .set(postRef, post)
      .update(threadRef, {
        posts: arrayUnion(postRef.id),
        contributors: arrayUnion(usersStore.authId),
      })
      .update(userRef,{
        postsCount: increment(1)
      })
      .commit()

    const newPost = await getDoc(postRef)

    upsert(posts.value, { ...newPost.data(), id: newPost.id })
    const thread = findById(threadsStore.threads, newPost.data().threadId)
    if (!thread) {
      return console.warn("thread doesn't exist")
    }

    upsert(thread.posts, newPost.id)
    if (!thread.contributors) {
      thread.contributors = []
    }
    upsert(thread.contributors, usersStore.authId)
  }

  const fetchPost = (id) => fetchItem('posts', id, posts.value)
  const fetchPosts = (ids) => fetchItems('posts', ids, posts.value)
  const fetchAllPosts = () => fetchAllItems('posts', posts.value)

  return { posts, createPost, fetchPost, fetchPosts, fetchAllPosts }
})
