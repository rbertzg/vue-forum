<template>
  <ForumList
    v-for="category in categories"
    :key="category.id"
    :categoryId="category.id"
  />
</template>

<script setup>
  import ForumList from './ForumList.vue'

  defineProps({
    categories: { type: Array, required: true },
  })
</script>
