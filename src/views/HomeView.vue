<template>
  <h1>Welcome to the Forum</h1>
  <ThreadList :threads="threads" />
</template>

<script setup>
  import ThreadList from '@/components/ThreadList.vue'
  import sourceData from '@/data.json'
  import { ref } from 'vue'

  const threads = ref(sourceData.threads)
</script>
