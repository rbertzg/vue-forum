import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchItems } from '../api'

export const useForumsStore = defineStore('ForumsStore', () => {
  const forums = ref([])

  async function fetchForums(ids) {
    return await fetchItems('forums', ids, forums.value)
  }

  return { forums, fetchForums }
})
