<template>
  <div class="thread">
    <div>
      <RouterLink :to="{ name: 'Thread', params: { id: thread.id } }">
        {{ thread.title }}
      </RouterLink>
      <p class="text-faded text-xsmall">
        By <a href="#">{{ user.name }}</a
        >, <AppDate :timestamp="thread.publishedAt" />.
      </p>
    </div>

    <div class="activity">
      <p class="replies-count">{{ repliesCount }} replies</p>
      <img
        class="avatar-medium"
        :src="user.avatar"
        alt=""
      />
      <div>
        <p class="text-xsmall">
          <a href="#">{{ user.name }}</a>
        </p>
        <p class="text-xsmall text-faded">
          <AppDate :timestamp="thread.publishedAt" />
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import { findById } from '../helpers'
  import { useUsersStore } from '../stores/UsersStore'
  import AppDate from './AppDate.vue'

  const props = defineProps({
    thread: { type: Object, required: true },
  })

  const usersStore = useUsersStore()

  const user = computed(() => findById(usersStore.users, props.thread.userId) || {})
  const repliesCount = computed(() => props.thread.posts?.length - 1 || 0)
</script>
