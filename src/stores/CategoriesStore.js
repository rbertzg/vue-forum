import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchAllItems, fetchItem, fetchItems } from '../api'

export const useCategoriesStore = defineStore('CategoriesStore', () => {
  const categories = ref([])

  async function fetchCategory(id) {
    return await fetchItem('categories', id, categories.value)
  }

  async function fetchCategories(ids) {
    return await fetchItems('categories', ids, categories.value)
  }

  async function fetchAllCategories() {
    return await fetchAllItems('categories', categories.value)
  }

  return { categories, fetchCategory, fetchCategories, fetchAllCategories }
})
