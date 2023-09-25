import sourceData from '@/data.json'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStore = defineStore('store', () => {
  const data = ref(sourceData)

  return { data }
})
