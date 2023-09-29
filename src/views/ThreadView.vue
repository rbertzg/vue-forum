<template>
  <div class="col-large push-top">
    <h1>{{ thread.title }}</h1>
    <RouterLink
      :to="{
        name: 'ThreadEdit',
        params: {
          id: thread.id,
        },
      }"
      class="btn-small btn-green"
    >
      Edit
    </RouterLink>
    <p>
      By
      <a
        href="#"
        class="link-unstyled"
        >{{ thread.author.name }}</a
      >, <AppDate :timestamp="thread.publishedAt" />.
      <span
        v-if="thread.repliesCount > 0"
        style="float: right; margin-top: 2px"
        class="hide-mobile text-faded text-small"
        >{{ thread.repliesCount }} replies by
        {{ thread.contributorsCount }} contributors</span
      >
    </p>
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
  import AppDate from '../components/AppDate.vue'
  import PostList from '../components/PostList.vue'
  import PostReply from '../components/PostReply.vue'

  const props = defineProps({
    id: { type: String, required: true },
  })

  const threadsStore = useThreadsStore()
  const postsStore = usePostsStore()

  const thread = threadsStore.thread(props.id)

  const threadPosts = computed(() =>
    postsStore.posts.filter((post) => post.threadId === props.id)
  )

  const handleReply = (replyText) => {
    const post = {
      text: replyText,
      threadId: props.id,
    }
    postsStore.createPost(post)
  }
</script>
