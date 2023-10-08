<template>
  <div class="post">
    <div
      v-if="user"
      class="user-info"
    >
      <a
        href="#"
        class="user-name"
        >{{ user.name }}</a
      >
      <a href="#">
        <img
          class="avatar-large"
          :src="user.avatar"
          alt=""
        />
      </a>
      <p class="desktop-only text-small">{{ user.postsCount }} posts</p>
      <p class="desktop-only text-small">{{ user.threadsCount }} threads</p>
    </div>
    <div class="post-content">
      <PostEditor
        v-if="editing === post.id"
        :post="post"
      />
      <div v-else>
        <p>{{ post.text }}</p>
      </div>
      <a
        @click.prevent="toggleEditMode(post.id)"
        href="#"
        style="margin-left: auto; padding-left: 20px"
        class="link-unstyled"
        title="Make a change"
      >
        <FontAwesomeIcon icon="pencil" />
      </a>
    </div>
    <div class="post-date text-faded">
      <AppDate :timestamp="post.publishedAt" />
    </div>
  </div>
</template>

<script setup>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import { computed, ref } from 'vue'
  import { useUsersStore } from '../stores/UsersStore'
  import AppDate from './AppDate.vue'
  import PostEditor from './PostEditor.vue'

  const props = defineProps({
    post: { type: Object, required: true },
  })

  const usersStore = useUsersStore()
  const user = computed(() => usersStore.user(props.post.userId))

  const editing = ref(null)
  const toggleEditMode = (postId) => {
    editing.value = postId === editing.value ? null : postId
  }
</script>
