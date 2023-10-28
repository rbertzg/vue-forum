import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUnsubscribesStore = defineStore('UnsubscribesStore', () => {
  const unsubscribes = ref([])
  const authUserUnsubscribe = ref(null)

  const addUnsubscribe = (fn) => {
    unsubscribes.value.push(fn)
  }

  const setAuthUserUnsubscribe = (fn) => {
    authUserUnsubscribe.value = fn
  }

  const unsubscribeAllSnapshots = async () => {
    for await (const unsubscribe of unsubscribes.value) {
      unsubscribe()
    }
    clearAllUnsubscribes()
  }

  const unsubscribeAuthUserSnapshot = async () => {
    if (authUserUnsubscribe.value) {
      authUserUnsubscribe.value()
      authUserUnsubscribe.value = null
    }
  }
  const clearAllUnsubscribes = () => {
    unsubscribes.value = []
  }

  return {
    unsubscribes,
    addUnsubscribe,
    setAuthUserUnsubscribe,
    unsubscribeAuthUserSnapshot,
    unsubscribeAllSnapshots,
    clearAllUnsubscribes,
  }
})
