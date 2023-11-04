import { usePostsStore } from '@/stores/PostsStore'
import { useThreadsStore } from '@/stores/ThreadsStore'
import { doc, getDoc, getFirestore, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { fetchAllItems, fetchItem, fetchItems } from '../api'
import { docToResource, findById, upsert } from '../helpers'

export const useUsersStore = defineStore('UsersStore', () => {
  const postsStore = usePostsStore()
  const threadsStore = useThreadsStore()
  const db = getFirestore()

  const users = ref([])

  const user = computed(() => {
    return (id) => {
      const user = findById(users.value, id)
      if (!user) return

      const posts = postsStore.posts.filter((post) => post.userId === user.id)
      const threads = threadsStore.threads.filter((thread) => thread.userId === user.id)
      const postsCount = user.postsCount || 0
      const threadsCount = user.threads?.length || 0

      return {
        ...user,
        posts,
        postsCount,
        threads,
        threadsCount,
      }
    }
  })

  async function createUser({ id, email, username, name, avatar = null }) {
    const registeredAt = serverTimestamp()
    const usernameLower = username.toLowerCase()
    email = email.toLowerCase()

    const user = { email, username, usernameLower, name, avatar, registeredAt }

    const userRef = doc(db, 'users', id)
    await setDoc(userRef, user)
    const newUser = await getDoc(userRef)

    setUser(newUser)
    return docToResource(newUser)
  }

  const setUser = (user) => upsert(users.value, docToResource(user))
  const updateUser = async (user) => {
    const updates = {
      avatar: user.avatar || null,
      username: user.username || null,
      name: user.name || null,
      bio: user.bio || null,
      website: user.website || null,
      email: user.email || null,
      location: user.location || null,
    }

    const userRef = doc(db, 'users', user.id)
    await updateDoc(userRef, updates)
  }
  const fetchUser = (id) => fetchItem('users', id, users.value)
  const fetchUsers = (ids) => fetchItems('users', ids, users.value)
  const fetchAllUsers = () => fetchAllItems('users', users.value)

  return {
    users,
    user,
    createUser,
    setUser,
    updateUser,
    fetchUser,
    fetchUsers,
    fetchAllUsers,
  }
})
