<template>
  <div class="col-full">
    <div class="thread-list">
      <h2 class="list-title">Threads</h2>
      <ThreadListItem
        v-for="thread in threads"
        :key="thread.id"
        :thread="thread"
      />
    </div>
  </div>
</template>

<script setup>
  import ThreadListItem from '@/components/ThreadListItem.vue'

  defineProps({
    threads: { type: Array, required: true },
  })
</script>
