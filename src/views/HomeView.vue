<template>
  <h1>Welcome to the Forum</h1>
  <CategoryList :categories="categoriesStore.categories" />
</template>

<script setup>
  import CategoryList from '../components/CategoryList.vue'
  import { useCategoriesStore } from '../stores/CategoriesStore'

  const categoriesStore = useCategoriesStore()
</script>
