<template>
  <div class="col-full push-top">
    <h1>Editing {{ thread.title }}</h1>
    <ThreadEditor
      :title="thread.title"
      :text="text"
      @cancel="cancel"
      @save="save"
    />
  </div>
</template>

<script setup>
  import { usePostsStore } from '@/stores/PostsStore'
  import { useThreadsStore } from '@/stores/ThreadsStore'
  import { useRouter } from 'vue-router'
  import ThreadEditor from '../components/ThreadEditor.vue'
  import { findById } from '../helpers'

  const props = defineProps({
    id: { type: String, required: true },
  })

  const router = useRouter()

  const threadsStore = useThreadsStore()
  const postsStore = usePostsStore()

  const thread = findById(threadsStore.threads, props.id)
  const text = findById(postsStore.posts, thread.posts[0]).text

  function cancel() {
    router.push({ name: 'Thread', params: { id: props.id } })
  }

  async function save({ title, text }) {
    const thread = await threadsStore.updateThread(props.id, title, text)
    router.push({ name: 'Thread', params: { id: thread.id } })
  }
</script>