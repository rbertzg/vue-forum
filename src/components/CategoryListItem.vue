<template>
  <ForumList :categoryId="categoryId" />
</template>

<script setup>
  import ForumList from './ForumList.vue'

  defineProps({
    categoryId: { type: String, required: true },
  })
</script>
