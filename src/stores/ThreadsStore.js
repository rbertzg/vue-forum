import sourceData from '@/data.json'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThreadsStore = defineStore('ThreadsStore', () => {
  const threads = ref(sourceData.threads)
  return { threads }
})
