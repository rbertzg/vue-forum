import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword as signInWithEmailAndPasswordFirebase,
  signInWithPopup,
  signOut as signOutFirebase,
} from 'firebase/auth'
import { collection, doc, getDoc, getDocs, getFirestore, query, where } from 'firebase/firestore'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { fetchItem } from '../api'
import { findById } from '../helpers'
import { usePostsStore } from './PostsStore'
import { useUnsubscribesStore } from './UnsubscribesStore'
import { useUsersStore } from './UsersStore'

export const useAuthStore = defineStore('AuthStore', () => {
  const db = getFirestore()
  const usersStore = useUsersStore()
  const postsStore = usePostsStore()
  const unsubscribesStore = useUnsubscribesStore()

  const authId = ref(null)
  const authUser = computed(() => findById(usersStore.users, authId.value))

  const setAuthId = (id) => (authId.value = id)

  const fetchAuthUser = async () => {
    const auth = getAuth()
    const userId = auth.currentUser?.uid
    if (!userId) return
    const authUser = await fetchItem('users', userId, usersStore.users, (unsubscribe) => {
      unsubscribesStore.setAuthUserUnsubscribe(unsubscribe)
    })
    setAuthId(authUser?.id)
  }

  const fetchAuthUserPosts = async () => {
    const q = query(collection(db, 'posts'), where('userId', '==', authId.value))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((post) => postsStore.setPost(post))
  }

  const initAuthentication = () => {
    if (unsubscribesStore.authObserverUnsubscribe) {
      unsubscribesStore.authObserverUnsubscribe()
    }
    return new Promise((resolve) => {
      const auth = getAuth()
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        unsubscribesStore.unsubscribeAuthUserSnapshot()
        if (user) {
          await fetchAuthUser()
          resolve(user)
        } else resolve(null)
      })
      unsubscribesStore.setAuthObserverUnsubscribe(unsubscribe)
    })
  }

  const registerUserWithEmailAndPassword = async ({
    email,
    password,
    username,
    name,
    avatar = null,
  }) => {
    const auth = getAuth()
    const result = await createUserWithEmailAndPassword(auth, email, password)
    await usersStore.createUser({ id: result.user.uid, email, username, name, avatar })
    fetchAuthUser()
  }

  const signInWithEmailAndPassword = ({ email, password }) => {
    const auth = getAuth()
    signInWithEmailAndPasswordFirebase(auth, email, password)
  }

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    const auth = getAuth()

    const result = await signInWithPopup(auth, provider)
    const user = result.user

    const userRef = doc(db, 'users', user.uid)
    const userDoc = await getDoc(userRef)

    if (!userDoc.exists()) {
      await usersStore.createUser({
        id: user.uid,
        email: user.email,
        username: user.email,
        name: user.displayName,
        avatar: user.photoURL,
      })
    }
  }

  const signOut = async () => {
    const auth = getAuth()
    signOutFirebase(auth)
    setAuthId(null)
  }

  return {
    authId,
    setAuthId,
    authUser,
    fetchAuthUser,
    fetchAuthUserPosts,
    initAuthentication,
    registerUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithGoogle,
    signOut,
  }
})
