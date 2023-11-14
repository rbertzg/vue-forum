<template>
  <div class="container">
    <div class="flex-grid">
      <div class="col-3 push-top">
        <UserProfileCard
          v-if="!edit"
          :user="user"
        />
        <UserProfileCardEditor
          v-else
          :user="user"
        />
      </div>
      <div class="col-7 push-top">
        <div class="profile-header">
          <span class="text-lead"> {{ user.name }}'s recent activity </span>
          <a href="#">See only started threads?</a>
        </div>
        <hr />
        <PostList :posts="user.posts" />
        <AppInfiniteScroll
          @load="authStore.fetchAuthUserPosts(lastPostFetched)"
          :done="user.posts.length === user.postsCount"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
  import PostList from '@/components/PostList.vue'
  import { computed } from 'vue'
  import AppInfiniteScroll from '../components/AppInfiniteScroll.vue'
  import UserProfileCard from '../components/UserProfileCard.vue'
  import UserProfileCardEditor from '../components/UserProfileCardEditor.vue'
  import { useProgressBar } from '../composables/useProgressBar'
  import { useAuthStore } from '../stores/AuthStore'
  import { useUsersStore } from '../stores/UsersStore'

  defineProps({
    edit: { type: Boolean, default: false },
  })

  const usersStore = useUsersStore()
  const authStore = useAuthStore()

  const user = computed(() => usersStore.user(authStore.authId))
  const lastPostFetched = computed(() => {
    if (user.value.posts.length === 0) return null
    return user.value.posts[user.value.posts.length - 1]
  })

  const { start, end } = useProgressBar()

  start()
  await authStore.fetchAuthUserPosts(lastPostFetched.value)
  end()
</script>
