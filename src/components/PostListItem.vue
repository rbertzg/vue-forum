<template>
  <div class="post">
    <div
      v-if="user"
      class="user-info"
    >
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
      <p class="desktop-only text-small">{{ user.postsCount }} posts</p>
      <p class="desktop-only text-small">{{ user.threadsCount }} threads</p>
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
  import { useUsersStore } from '../stores/UsersStore'
  import AppDate from './AppDate.vue'

  const props = defineProps({
    post: { type: Object, required: true },
  })

  const usersStore = useUsersStore()
  const user = computed(() => usersStore.user(props.post.userId))
</script>
