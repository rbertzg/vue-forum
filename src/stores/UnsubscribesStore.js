import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUnsubscribesStore = defineStore('UnsubscribesStore', () => {
  const unsubscribes = ref([])

  const addUnsubscribe = (fn) => {
    unsubscribes.value.push(fn)
  }

  const unsubscribeAllSnapshots = async () => {
    for await (const unsubscribe of unsubscribes.value) {
      unsubscribe()
    }
    clearAllUnsubscribes()
  }

  const clearAllUnsubscribes = () => {
    unsubscribes.value = []
  }

  return { unsubscribes, addUnsubscribe, unsubscribeAllSnapshots, clearAllUnsubscribes }
})
