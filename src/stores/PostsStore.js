import { useThreadsStore } from '@/stores/ThreadsStore'
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getFirestore,
  increment,
  serverTimestamp,
  updateDoc,
  writeBatch,
} from 'firebase/firestore'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchAllItems, fetchItem, fetchItems } from '../api'
import { docToResource, findById, upsert } from '../helpers'
import { useAuthStore } from './AuthStore'

export const usePostsStore = defineStore('PostsStore', () => {
  const posts = ref([])
  const authStore = useAuthStore()
  const threadsStore = useThreadsStore()
  const db = getFirestore()

  async function updatePost({ text, id }) {
    const post = {
      text,
      edited: {
        at: serverTimestamp(),
        by: authStore.authId,
        moderated: false,
      },
    }

    const postRef = doc(db, 'posts', id)
    await updateDoc(postRef, post)
    const updatedPost = await getDoc(postRef)
    setPost(updatedPost)
  }

  async function createPost(post) {
    post.userId = authStore.authId
    post.publishedAt = serverTimestamp()

    const postRef = doc(collection(db, 'posts'))
    const threadRef = doc(db, 'threads', post.threadId)
    const userRef = doc(db, 'users', authStore.authId)
    await writeBatch(db)
      .set(postRef, post)
      .update(threadRef, {
        posts: arrayUnion(postRef.id),
        contributors: arrayUnion(authStore.authId),
      })
      .update(userRef, {
        postsCount: increment(1),
      })
      .commit()

    const newPost = await getDoc(postRef)

    setPost(newPost)
    const thread = findById(threadsStore.threads, newPost.data().threadId)
    if (!thread) {
      return console.warn("thread doesn't exist")
    }

    upsert(thread.posts, newPost.id)
    if (!thread.contributors) {
      thread.contributors = []
    }
    upsert(thread.contributors, authStore.authId)
  }

  const setPost = (post) => upsert(posts.value, docToResource(post))
  const fetchPost = (id) => fetchItem('posts', id, posts.value)
  const fetchPosts = (ids) => fetchItems('posts', ids, posts.value)
  const fetchAllPosts = () => fetchAllItems('posts', posts.value)

  return {
    posts,
    setPost,
    createPost,
    updatePost,
    fetchPost,
    fetchPosts,
    fetchAllPosts,
  }
})
