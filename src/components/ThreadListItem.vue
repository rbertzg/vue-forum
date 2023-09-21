<template>
  <div class="thread">
    <div>
      <p>
        <RouterLink :to="{ name: 'Thread', params: { id: thread.id } }">
          {{ thread.title }}
        </RouterLink>
      </p>
      <p class="text-faded text-xsmall">
        By <a href="#">{{ getUserById(thread.userId).name }}</a>,
        <AppDate :timestamp="thread.publishedAt" />.
      </p>
    </div>

    <div class="activity">
      <p class="replies-count">{{ thread.posts.length }} replies</p>
      <img class="avatar-medium" :src="getUserById(thread.userId).avatar" alt="" />
      <div>
        <p class="text-xsmall">
          <a href="#">{{ getUserById(thread.userId).name }}</a>
        </p>
        <p class="text-xsmall text-faded">
          <AppDate :timestamp="thread.publishedAt" />
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import sourceData from '@/data.json';
import { ref } from 'vue';
import AppDate from './AppDate.vue';

defineProps({
  thread: { type: Object, required: true },
})

const users = ref(sourceData.users)
const getUserById = (id) => users.value.find((user) => user.id === id)
</script>
