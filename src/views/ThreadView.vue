<template>
  <div class="col-large push-top">
    <h1>{{ thread.title }}</h1>
    <PostList :posts="threadPosts" />
    <PostReply
      :thread="thread"
      @reply="handleReply"
    />
  </div>
</template>

<script setup>
  import { usePostsStore } from '@/stores/PostsStore'
  import { useThreadsStore } from '@/stores/ThreadsStore'
  import { computed } from 'vue'
  import PostList from '../components/PostList.vue'
  import PostReply from '../components/PostReply.vue'

  const props = defineProps({
    id: { type: String, required: true },
  })

  const threadsStore = useThreadsStore()
  const postsStore = usePostsStore()
  const thread = computed(() =>
    threadsStore.threads.find((thread) => thread.id === props.id)
  )
  const threadPosts = computed(() =>
    postsStore.posts.filter((post) => post.threadId === props.id)
  )

  const handleReply = (replyText) => {
    const post = {
      text: replyText,
      publishedAt: Math.floor(Date.now() / 1000),
      threadId: props.id,
      userId: 'ALXhxjwgY9PinwNGHpfai6OWyDu2',
    }
    postsStore.createPost(post)
  }
</script>
