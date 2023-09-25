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
  import { useCategoriesStore } from '../stores/CategoriesStore'
  import { useForumsStore } from '../stores/ForumsStore'
  import ForumListItem from './ForumListItem.vue'

  const props = defineProps({
    categoryId: { type: String, required: true },
  })

  const categoriesStore = useCategoriesStore()
  const forumsStore = useForumsStore()

  const categoryName = computed(() => {
    return categoriesStore.categories.find(
      (category) => category.id === props.categoryId
    ).name
  })

  const categoryForums = computed(() => {
    return forumsStore.forums.filter(
      (forum) => forum.categoryId === props.categoryId
    )
  })
</script>
