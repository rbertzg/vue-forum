import { usePostsStore } from '@/stores/PostsStore'
import { useThreadsStore } from '@/stores/ThreadsStore'
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword as signInWithEmailAndPasswordFirebase,
  signInWithPopup,
  signOut as signOutFirebase,
} from 'firebase/auth'
import { doc, getDoc, getFirestore, serverTimestamp, setDoc } from 'firebase/firestore'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { fetchAllItems, fetchItem, fetchItems } from '../api'
import { docToResource, findById, upsert } from '../helpers'
import { useUnsubscribesStore } from './UnsubscribesStore'

export const useUsersStore = defineStore('UsersStore', () => {
  const postsStore = usePostsStore()
  const threadsStore = useThreadsStore()
  const unsubscribesStore = useUnsubscribesStore()
  const db = getFirestore()

  const users = ref([])
  const authId = ref(null)

  const auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    unsubscribesStore.unsubscribeAuthUserSnapshot()
    if (user) {
      fetchAuthUser()
    }
  })

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

  const authUser = computed(() => findById(users.value, authId.value))

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
  async function registerUserWithEmailAndPassword({
    email,
    password,
    username,
    name,
    avatar = null,
  }) {
    const auth = getAuth()
    const result = await createUserWithEmailAndPassword(auth, email, password)
    await createUser({ id: result.user.uid, email, username, name, avatar })
    fetchAuthUser()
  }
  function signInWithEmailAndPassword({ email, password }) {
    const auth = getAuth()
    signInWithEmailAndPasswordFirebase(auth, email, password)
  }
  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider()
    const auth = getAuth()

    const result = await signInWithPopup(auth, provider)
    const user = result.user

    const userRef = doc(db, 'users', user.uid)
    const userDoc = await getDoc(userRef)

    if (!userDoc.exists()) {
      await createUser({
        id: user.uid,
        email: user.email,
        username: user.email,
        name: user.displayName,
        avatar: user.photoURL,
      })
    }
  }
  async function signOut() {
    const auth = getAuth()
    signOutFirebase(auth)
    setAuthId(null)
  }
  const setAuthId = (id) => (authId.value = id)
  const setUser = (user) => upsert(users.value, docToResource(user))
  const fetchUser = (id) => fetchItem('users', id, users.value)
  const fetchUsers = (ids) => fetchItems('users', ids, users.value)
  const fetchAllUsers = () => fetchAllItems('users', users.value)

  const fetchAuthUser = () => {
    const auth = getAuth()
    const userId = auth.currentUser?.uid
    if (!userId) return
    fetchItem('users', userId, users.value, (unsubscribe) => {
      unsubscribesStore.setAuthUserUnsubscribe(unsubscribe)
    })
    setAuthId(userId)
  }

  return {
    users,
    user,
    authUser,
    authId,
    setAuthId,
    createUser,
    registerUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithGoogle,
    signOut,
    setUser,
    fetchUser,
    fetchUsers,
    fetchAllUsers,
    fetchAuthUser,
  }
})
