<template>
  <div
    v-if="thread"
    class="col-large push-top"
  >
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
        >{{ author?.name }}</a
      >, <AppDate :timestamp="thread.publishedAt" />.
      <span
        v-if="repliesCount > 1"
        style="float: right; margin-top: 2px"
        class="hide-mobile text-faded text-small"
        >{{ repliesCount }} replies by {{ contributorsCount }} contributors</span
      >
    </p>
    <PostList :posts="posts" />
    <PostEditor @save="addPost" />
  </div>
</template>

<script setup>
  import { useThreadsStore } from '@/stores/ThreadsStore'
  import { computed, onMounted } from 'vue'
  import AppDate from '../components/AppDate.vue'
  import PostEditor from '../components/PostEditor.vue'
  import PostList from '../components/PostList.vue'
  import { findById } from '../helpers'
  import { usePostsStore } from '../stores/PostsStore'
  import { useUsersStore } from '../stores/UsersStore'

  const props = defineProps({
    id: { type: String, required: true },
  })

  const threadsStore = useThreadsStore()
  const { fetchThread } = threadsStore

  const postsStore = usePostsStore()
  const { fetchPosts } = postsStore

  const usersStore = useUsersStore()
  const { fetchUsers } = usersStore

  const thread = computed(() => findById(threadsStore.threads, props.id))

  const posts = computed(() => postsStore.posts.filter((post) => post.threadId === thread.value.id))
  const author = computed(() => findById(usersStore.users, thread.value.userId))

  const repliesCount = computed(() => thread.value.posts?.length - 1 || 0)

  const contributorsCount = computed(() => thread.value.contributors?.length || 0)

  const addPost = ({ text }) => {
    const post = {
      text,
      threadId: props.id,
    }
    postsStore.createPost(post)
  }

  onMounted(async () => {
    const fetchedThread = await fetchThread(props.id)
    const posts = await fetchPosts(fetchedThread.posts)
    const userIds = posts.map((post) => post.userId)
    fetchUsers(userIds)
  })
</script>
