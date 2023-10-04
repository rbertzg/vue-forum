<template>
  <h1 class="push-top">Welcome to the Forum</h1>
  <CategoryList :categories="categoriesStore.categories" />
</template>

<script setup>
  import { onBeforeMount } from 'vue'
  import CategoryList from '../components/CategoryList.vue'
  import { useCategoriesStore } from '../stores/CategoriesStore'
  import { useForumsStore } from '../stores/ForumsStore'

  const categoriesStore = useCategoriesStore()
  const forumsStore = useForumsStore()
  const { fetchForums } = forumsStore

  onBeforeMount(async () => {
    const categories = await categoriesStore.fetchAllCategories()
    const forumIds = categories.map((c) => c.forums).flat()
    fetchForums(forumIds)
  })
</script>
