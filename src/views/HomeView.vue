<template>
  <h1>Welcome to the Forum</h1>
  <CategoryList :categories="categories" />
</template>

<script setup>
  import CategoryList from '../components/CategoryList.vue'
  import { useStore } from '../stores/Store'

  const store = useStore()

  const categories = store.data.categories
</script>
