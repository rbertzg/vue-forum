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
  import sourceData from '@/data.json'
  import { computed, ref } from 'vue'
  import PostList from '../components/PostList.vue'
  import PostReply from '../components/PostReply.vue'

  const props = defineProps({
    id: { type: String, required: true },
  })

  const threads = ref(sourceData.threads)
  const posts = ref(sourceData.posts)

  const thread = computed(() =>
    threads.value.find((thread) => thread.id === props.id)
  )
  const threadPosts = computed(() =>
    posts.value.filter((post) => post.threadId === props.id)
  )

  const handleReply = (replyText) => {
    const postId = 'post' + Math.random()
    const post = {
      id: postId,
      text: replyText,
      publishedAt: Math.floor(Date.now() / 1000),
      threadId: props.id,
      userId: 'ALXhxjwgY9PinwNGHpfai6OWyDu2',
    }

    thread.value.posts.push(postId)
    posts.value.push(post)
  }
</script>
