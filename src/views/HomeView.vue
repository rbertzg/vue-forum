<template>
  <div class="container">
    <h1 class="push-top">Welcome to the Forum</h1>
    <CategoryList :categories="categoriesStore.categories" />
  </div>
</template>

<script setup>
  import CategoryList from '../components/CategoryList.vue'
  import { useCategoriesStore } from '../stores/CategoriesStore'
  import { useForumsStore } from '../stores/ForumsStore'

  const categoriesStore = useCategoriesStore()
  const forumsStore = useForumsStore()
  const { fetchForums } = forumsStore

  const fetchedCategories = await categoriesStore.fetchAllCategories()
  const forumIds = fetchedCategories.map((c) => c.forums).flat()
  await fetchForums(forumIds)
</script>
