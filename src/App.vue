<template>
  <TheNavigation />
  <div class="container">
    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <Suspense>
          <component :is="Component"></component>
          <template #fallback> data... </template>
        </Suspense>
      </template>
    </RouterView>
  </div>
</template>

<script setup>
  import TheNavigation from './components/TheNavigation.vue'
  import { useUsersStore } from './stores/UsersStore'

  const usersStore = useUsersStore()
  const { fetchAuthUser } = usersStore

  fetchAuthUser()
</script>
