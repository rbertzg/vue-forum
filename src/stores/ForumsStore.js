import sourceData from '@/data.json'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useForumsStore = defineStore('ForumsStore', () => {
  const forums = ref(sourceData.forums)
  return { forums }
})
