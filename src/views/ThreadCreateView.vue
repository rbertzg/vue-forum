<template>
  <div class="col-full push-top">
    <h1>
      Create new thread in <i>{{ forum.name }}</i>
    </h1>
    <ThreadEditor
      @cancel="cancel"
      @save="save"
      @dirty="isFormDirty = true"
      @clean="isFormDirty = false"
    />
  </div>
</template>

<script setup>
  import { useThreadsStore } from '@/stores/ThreadsStore'
  import { computed, ref } from 'vue'
  import { onBeforeRouteLeave, useRouter } from 'vue-router'
  import ThreadEditor from '../components/ThreadEditor.vue'
  import { useProgressBar } from '../composables/useProgressBar'
  import { findById } from '../helpers'
  import { useForumsStore } from '../stores/ForumsStore'

  const props = defineProps({
    forumId: { type: String, required: true },
  })

  const router = useRouter()

  const { start, end } = useProgressBar()

  const threadsStore = useThreadsStore()

  const forumsStore = useForumsStore()
  const { fetchForum } = forumsStore

  const isFormDirty = ref(false)
  const forum = computed(() => findById(forumsStore.forums, props.forumId))

  function cancel() {
    router.push({ name: 'Forum', params: { id: props.forumId } })
  }

  async function save({ title, text }) {
    const thread = await threadsStore.createThread({ title, forumId: props.forumId, text })
    router.push({ name: 'Thread', params: { id: thread.id } })
  }

  start()
  await fetchForum(props.forumId)
  end()

  onBeforeRouteLeave(() => {
    if (isFormDirty.value) {
      const confirmed = confirm('Do you really want to leave? you have unsaved changes!')
      if (!confirmed) return false
    }
  })
</script>
