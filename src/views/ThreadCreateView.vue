<template>
  <div class="col-full push-top">
    <h1>
      Create new thread in <i>{{ forum.name }}</i>
    </h1>
    <ThreadEditor
      @cancel="cancel"
      @save="save"
    />
  </div>
</template>

<script setup>
  import { useThreadsStore } from '@/stores/ThreadsStore'
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'
  import ThreadEditor from '../components/ThreadEditor.vue'
  import { useForumsStore } from '../stores/ForumsStore'

  const props = defineProps({
    forumId: { type: String, required: true },
  })

  const router = useRouter()

  const threadsStore = useThreadsStore()
  const forumsStore = useForumsStore()
  const forum = computed(() =>
    forumsStore.forums.find((forum) => forum.id === props.forumId)
  )

  function cancel() {
    router.push({ name: 'Forum', params: { id: props.forumId } })
  }

  async function save({ title, text }) {
    const thread = await threadsStore.createThread(
      { title, forumId: props.forumId },
      text
    )
    router.push({ name: 'Thread', params: { id: thread.id } })
  }
</script>
