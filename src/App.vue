<template>
  <TheNavigation />
  <div class="container">
    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <Suspense>
          <component :is="Component"></component>
          <template #fallback> <AppSpinner /></template>
        </Suspense>
      </template>
    </RouterView>
  </div>
</template>

<script setup>
  import AppSpinner from './components/AppSpinner.vue'
  import TheNavigation from './components/TheNavigation.vue'
  import { useUsersStore } from './stores/UsersStore'

  const usersStore = useUsersStore()
  const { fetchAuthUser } = usersStore

  fetchAuthUser()
</script>

<style>
  @import 'nprogress/nprogress.css';

  #nprogress .bar {
    height: 3px;
    background-color: #57ad8d;
  }
  #nprogress .spinner-icon {
    border-top-color: #57ad8d;
    border-left-color: #57ad8d;
  }
  #nprogress .peg {
    box-shadow:
      0 0 10px #57ad8d,
      0 0 5px #57ad8d;
  }
</style>
