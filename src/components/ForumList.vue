<template>
  <div class="col-full">
    <div class="forum-list">
      <RouterLink
        :to="{ name: 'Category', params: { id: categoryId } }"
        class="list-title"
        >{{ categoryName }}
      </RouterLink>
      <ForumListItem
        v-for="forum in categoryForums"
        :key="forum.id"
        :forum="forum"
      />
    </div>
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import { useStore } from '../stores/Store'
  import ForumListItem from './ForumListItem.vue'

  const props = defineProps({
    categoryId: { type: String, required: true },
  })

  const store = useStore()

  const categories = store.data.categories
  const forums = store.data.forums

  const categoryName = computed(() => {
    return categories.find((category) => category.id === props.categoryId).name
  })

  const categoryForums = computed(() => {
    return forums.filter((forum) => forum.categoryId === props.categoryId)
  })
</script>
