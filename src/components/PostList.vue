<template>
  <div class="post-list">
    <PostListItem
      v-for="post in posts"
      :key="post.id"
      :post="post"
    />
  </div>
</template>

<script setup>
  import PostListItem from './PostListItem.vue'

  defineProps({
    posts: { type: Array, required: true },
  })
</script>
