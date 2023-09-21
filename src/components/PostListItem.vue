<template>
  <div class="post">
    <div class="user-info">
      <a
        href="#"
        class="user-name"
        >{{ getUserById(post.userId).name }}</a
      >
      <a href="#">
        <img
          class="avatar-large"
          :src="getUserById(post.userId).avatar"
          alt=""
        />
      </a>
      <p class="desktop-only text-small">107 posts</p>
    </div>
    <div class="post-content">
      <div>
        <p>
          {{ post.text }}
        </p>
      </div>
    </div>
    <div class="post-date text-faded">
      <AppDate :timestamp="post.publishedAt" />
    </div>
  </div>
</template>

<script setup>
  import sourceData from '@/data.json'
  import { ref } from 'vue'
  import AppDate from './AppDate.vue'

  defineProps({
    post: { type: Object, required: true },
  })

  const users = ref(sourceData.users)
  const getUserById = (id) => users.value.find((user) => user.id === id)
</script>
