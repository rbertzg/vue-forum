<template>
  <div class="col-full push-top">
    <h1>Editing {{ thread.title }}</h1>
    <ThreadEditor
      :title="thread.title"
      :text="text"
      @cancel="cancel"
      @save="save"
      @dirty="isFormDirty = true"
      @clean="isFormDirty = false"
    />
  </div>
</template>

<script setup>
  import { usePostsStore } from '@/stores/PostsStore'
  import { useThreadsStore } from '@/stores/ThreadsStore'
  import { computed, ref } from 'vue'
  import { onBeforeRouteLeave, useRouter } from 'vue-router'
  import ThreadEditor from '../components/ThreadEditor.vue'
  import { useProgressBar } from '../composables/useProgressBar'
  import { findById } from '../helpers'

  const props = defineProps({
    id: { type: String, required: true },
  })

  const router = useRouter()

  const { start, end } = useProgressBar()

  const threadsStore = useThreadsStore()
  const { fetchThread } = threadsStore

  const postsStore = usePostsStore()
  const { fetchPost } = postsStore

  const thread = computed(() => findById(threadsStore.threads, props.id))

  const isFormDirty = ref(false)
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

  start()
  const fetchedThread = await fetchThread(props.id)
  await fetchPost(fetchedThread.posts[0])
  end()

  onBeforeRouteLeave(() => {
    if (isFormDirty.value) {
      const confirmed = confirm('Do you really want to leave? you have unsaved changes!')
      if (!confirmed) return false
    }
  })
</script>
