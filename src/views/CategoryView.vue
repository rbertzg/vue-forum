<template>
  <CategoryListItem :categoryId="id" />
</template>

<script setup>
  import CategoryListItem from '../components/CategoryListItem.vue'

  defineProps({
    id: { type: String, required: true },
  })
</script>
