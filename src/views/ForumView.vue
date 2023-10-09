<template>
  <div
    v-if="isReady"
    class="col-full push-top"
  >
    <div>
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
    <div class="push-top">
      <ThreadList :threads="threads" />
    </div>
  </div>
  <div v-else-if="isLoading">Loading...</div>
</template>

<script setup>
  import ThreadList from '@/components/ThreadList.vue'
  import { useAsyncState } from '@vueuse/core'
  import { ref } from 'vue'
  import { useForumsStore } from '../stores/ForumsStore'
  import { useThreadsStore } from '../stores/ThreadsStore'
  import { useUsersStore } from '../stores/UsersStore'

  const props = defineProps({
    id: { type: String, required: true },
  })

  const forumsStore = useForumsStore()
  const { fetchForum } = forumsStore

  const threadsStore = useThreadsStore()
  const { fetchThreads } = threadsStore

  const usersStore = useUsersStore()
  const { fetchUsers } = usersStore

  const forum = ref()
  const threads = ref()

  const { isReady, isLoading } = useAsyncState(async () => {
    const fetchedForum = await fetchForum(props.id)
    const fetchedThreads = await fetchThreads(fetchedForum.threads)
    const userIds = fetchedThreads.map((thread) => thread.userId)
    await fetchUsers(userIds)
    forum.value = fetchedForum
    threads.value = fetchedThreads
  })
</script>
