<template>
  <div
    v-if="isReady"
    class="col-full push-top"
  >
    <h1>Editing {{ thread.title }}</h1>
    <ThreadEditor
      :title="thread.title"
      :text="text"
      @cancel="cancel"
      @save="save"
    />
  </div>
  <div v-else-if="isLoading">Loading...</div>
</template>

<script setup>
  import { usePostsStore } from '@/stores/PostsStore'
  import { useThreadsStore } from '@/stores/ThreadsStore'
  import { useAsyncState } from '@vueuse/core'
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'
  import ThreadEditor from '../components/ThreadEditor.vue'
  import { findById } from '../helpers'

  const props = defineProps({
    id: { type: String, required: true },
  })

  const router = useRouter()

  const threadsStore = useThreadsStore()
  const { fetchThread } = threadsStore

  const postsStore = usePostsStore()
  const { fetchPost } = postsStore

  const thread = computed(() => findById(threadsStore.threads, props.id))

  const text = computed(() => {
    const post = findById(postsStore.posts, thread.value.posts[0])
    return post ? post.text : ''
  })

  function cancel() {
    router.push({ name: 'Thread', params: { id: props.id } })
  }

  async function save({ title, text }) {
    const thread = await threadsStore.updateThread(props.id, title, text)
    router.push({ name: 'Thread', params: { id: thread.id } })
  }

  const { isReady, isLoading } = useAsyncState(async () => {
    const thread = await fetchThread(props.id)
    await fetchPost(thread.posts[0])
  })
</script>
