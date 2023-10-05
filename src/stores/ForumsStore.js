import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchAllItems, fetchItem, fetchItems } from '../api'

export const useForumsStore = defineStore('ForumsStore', () => {
  const forums = ref([])

  async function fetchForum(id) {
    return await fetchItem('forums', id, forums.value)
  }

  async function fetchForums(ids) {
    return await fetchItems('forums', ids, forums.value)
  }

  async function fetchAllForums() {
    return await fetchAllItems('forums', forums.value)
  }

  return { forums, fetchForum, fetchForums, fetchAllForums }
})
