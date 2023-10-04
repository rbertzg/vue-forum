import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchAllItems } from '../api'

export const useCategoriesStore = defineStore('CategoriesStore', () => {
  const categories = ref([])

  async function fetchAllCategories() {
    return await fetchAllItems('categories', categories.value)
  }

  return { categories, fetchAllCategories }
})
