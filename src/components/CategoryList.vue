<template>
  <CategoryListItem
    v-for="category in categories"
    :key="category.id"
    :categoryId="category.id"
  />
</template>

<script setup>
  import CategoryListItem from './CategoryListItem.vue'

  defineProps({
    categories: { type: Array, required: true },
  })
</script>
