<template>
  <div class="col-full push-top">
    <div class="forum-header">
      <div class="forum-details">
        <h1>{{ forum.name }}</h1>
        <p class="text-lead">{{ forum.description }}</p>
      </div>
      <RouterLink
        :to="{ name: 'ThreadCreate', params: { forumId: forum.id } }"
        class="btn-green btn-small"
        >New thread</RouterLink
      >
    </div>
  </div>
  <div class="col-full push-top">
    <ThreadList :threads="threads" />
  </div>
</template>

<script setup>
  import ThreadList from '@/components/ThreadList.vue'
  import { computed } from 'vue'
  import { findById } from '../helpers'
  import { useForumsStore } from '../stores/ForumsStore'
  import { useThreadsStore } from '../stores/ThreadsStore'

  const props = defineProps({
    id: { type: String, required: true },
  })

  const forumsStore = useForumsStore()
  const threadsStore = useThreadsStore()

  const forum = computed(() => findById(forumsStore.forums, props.id))
  const threads = computed(() =>
    forum.value.threads.map((threadId) => threadsStore.thread(threadId))
  )
  // const threads = computed(() =>
  //   threadsStore.threads.filter((thread) => thread.forumId === props.id)
  // )
</script>
