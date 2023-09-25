<template>
  <div class="forum-listing">
    <div class="forum-details">
      <RouterLink
        :to="{ name: 'Forum', params: { id: forum.id } }"
        class="text-xlarge"
      >
        {{ forum.name }}
      </RouterLink>
      <p>{{ forum.description }}</p>
    </div>
    <div class="threads-count">
      <p>
        <span class="count">{{ forum.threads?.length }}</span>
        {{ threadsCount(forum.threads) }}
      </p>
    </div>
    <div class="last-thread"></div>
  </div>
</template>

<script setup>
  defineProps({
    forum: { type: Object, required: true },
  })

  const threadsCount = (threads) => {
    if (threads) {
      return threads.length > 1 ? 'threads' : 'thread'
    } else {
      return 'No threads'
    }
  }
</script>
