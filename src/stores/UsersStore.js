import sourceData from '@/data.json'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUsersStore = defineStore('UsersStore', () => {
  const users = ref(sourceData.users)
  return { users }
})
