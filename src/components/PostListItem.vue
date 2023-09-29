<template>
  <div class="post">
    <div class="user-info">
      <a
        href="#"
        class="user-name"
        >{{ user.name }}</a
      >
      <a href="#">
        <img
          class="avatar-large"
          :src="user.avatar"
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
  import { computed } from 'vue'
  import { findById } from '../helpers'
  import { useUsersStore } from '../stores/UsersStore'
  import AppDate from './AppDate.vue'

  const props = defineProps({
    post: { type: Object, required: true },
  })

  const usersStore = useUsersStore()
  const user = computed(() => findById(usersStore.users, props.post.userId))
</script>
