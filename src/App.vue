<template>
  <TheNavigation />
  <div class="container">
    <RouterView></RouterView>
  </div>
</template>

<script setup>
  import TheNavigation from './components/TheNavigation.vue'
  import { useUsersStore } from './stores/UsersStore'

  const usersStore = useUsersStore()
  const { fetchAuthUser } = usersStore

  fetchAuthUser()
</script>
