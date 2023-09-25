<template>
  <div class="col-full push-top">
    <div class="forum-header">
      <div class="forum-details">
        <h1>{{ forum.name }}</h1>
        <p class="text-lead">{{ forum.description }}</p>
      </div>
      <a
        href="#"
        class="btn-green btn-small"
        >New thread</a
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
  import { useStore } from '../stores/Store'

  const props = defineProps({
    id: { type: Number, required: true },
  })

  const store = useStore()

  const forum = computed(() =>
    store.data.forums.find((forum) => forum.id === props.id)
  )
  const threads = computed(() =>
    store.data.threads.filter((thread) => thread.forumId === props.id)
  )
</script>
