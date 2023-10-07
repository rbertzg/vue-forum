import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchAllItems, fetchItem, fetchItems } from '../api'

export const useForumsStore = defineStore('ForumsStore', () => {
  const forums = ref([])

  const fetchForum = (id) => fetchItem('forums', id, forums.value)
  const fetchForums = (ids) => fetchItems('forums', ids, forums.value)
  const fetchAllForums = () => fetchAllItems('forums', forums.value)

  return { forums, fetchForum, fetchForums, fetchAllForums }
})
