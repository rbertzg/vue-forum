import sourceData from '@/data.json'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCategoriesStore = defineStore('CategoriesStore', () => {
  const categories = ref(sourceData.categories)
  return { categories }
})
