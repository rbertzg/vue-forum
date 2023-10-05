<template>
  <h1 class="push-top">Welcome to the Forum</h1>
  <CategoryList :categories="categories" />
</template>

<script setup>
  import { onBeforeMount, ref } from 'vue'
  import CategoryList from '../components/CategoryList.vue'
  import { useCategoriesStore } from '../stores/CategoriesStore'
  import { useForumsStore } from '../stores/ForumsStore'

  const categoriesStore = useCategoriesStore()
  const forumsStore = useForumsStore()
  const { fetchForums } = forumsStore

  const categories = ref([])

  onBeforeMount(async () => {
    const fetchedCategories = await categoriesStore.fetchAllCategories()
    categories.value = fetchedCategories
    const forumIds = fetchedCategories.map((c) => c.forums).flat()
    fetchForums(forumIds)
  })
</script>
