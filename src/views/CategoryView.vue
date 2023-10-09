<template>
  <ForumList :categoryId="id" />
</template>

<script setup>
  import ForumList from '../components/ForumList.vue'

  defineProps({
    id: { type: String, required: true },
  })
</script>
