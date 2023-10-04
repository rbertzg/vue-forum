import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStatsStore = defineStore('StatsStore', () => {
  const stats = ref([])
  return { stats }
})
