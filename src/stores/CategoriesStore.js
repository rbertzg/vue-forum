import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchAllItems, fetchItem, fetchItems } from '../api'

export const useCategoriesStore = defineStore('CategoriesStore', () => {
  const categories = ref([])

  const fetchCategory = (id) => fetchItem('categories', id, categories.value)
  const fetchCategories = (ids) => fetchItems('categories', ids, categories.value)
  const fetchAllCategories = () => fetchAllItems('categories', categories.value)

  return { categories, fetchCategory, fetchCategories, fetchAllCategories }
})
