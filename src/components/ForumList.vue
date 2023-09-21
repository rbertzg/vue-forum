<template>
  <div class="col-full">
    <div class="forum-list">
      <h2 class="list-title">
        <a href="#">Forums</a>
      </h2>
      <ForumListItem v-for="forum in forums" :key="forum.id" :forum="forum" />
    </div>
  </div>
</template>

<script setup>
import ForumListItem from './ForumListItem.vue';

defineProps({
  forums: { type: Array, required: true }
})
</script>
