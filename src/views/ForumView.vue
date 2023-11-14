<template>
  <div class="col-full push-top">
    <div>
      <div class="forum-header">
        <div class="forum-details">
          <h1>{{ forum.name }}</h1>
          <p class="text-lead">{{ forum.description }}</p>
        </div>
        <RouterLink
          :to="{ name: 'ThreadCreate', params: { forumId: forum.id } }"
          class="btn-green btn-small"
          >New thread
        </RouterLink>
      </div>
    </div>
    <div class="push-top">
      <ThreadList :threads="threads" />
      <VPagination
        v-model="page"
        :pages="totalPages"
        active-color="#57AD8D"
      />
    </div>
  </div>
</template>

<script setup>
  import ThreadList from '@/components/ThreadList.vue'
  import { useProgressBar } from '@/composables/useProgressBar'
  import { computed, ref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useForumsStore } from '../stores/ForumsStore'
  import { useThreadsStore } from '../stores/ThreadsStore'
  import { useUsersStore } from '../stores/UsersStore'

  const props = defineProps({
    id: { type: String, required: true },
  })

  const router = useRouter()
  const route = useRoute()

  const { start, end } = useProgressBar()

  const forumsStore = useForumsStore()
  const { fetchForum } = forumsStore

  const threadsStore = useThreadsStore()
  const { fetchThreadsByPage } = threadsStore

  const usersStore = useUsersStore()
  const { fetchUsers } = usersStore

  const page = ref(parseInt(route.query.page) || 1)
  const perPage = ref(10)
  const forum = ref()
  const threads = ref()
  const threadCount = computed(() => forum.value.threads.length)
  const totalPages = computed(() => Math.ceil(threadCount.value / perPage.value))

  start()
  const fetchedForum = await fetchForum(props.id)
  const fetchedThreads = await fetchThreadsByPage(fetchedForum.threads, page.value, perPage.value)
  const userIds = fetchedThreads.map((thread) => thread.userId)
  await fetchUsers(userIds)
  forum.value = fetchedForum
  threads.value = fetchedThreads
  end()

  watch(page, (newPage) => {
    router.push({ query: { page: newPage } })
    // threads.value = await fetchThreadsByPage(forum.value.threads, page.value, perPage.value)
    // const userIds = threads.value.map((thread) => thread.userId)
    // await fetchUsers(userIds)
  })
</script>
