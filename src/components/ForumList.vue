<template>
  <div class="col-full">
    <div class="forum-list">
      <RouterLink
        :to="{ name: 'Category', params: { id: categoryId } }"
        class="list-title"
        >{{ category.name }}
      </RouterLink>
      <ForumListItem
        v-for="forum in forums"
        :key="forum.id"
        :forum="forum"
      />
    </div>
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import { useProgressBar } from '../composables/useProgressBar'
  import { findById } from '../helpers'
  import { useCategoriesStore } from '../stores/CategoriesStore'
  import { useForumsStore } from '../stores/ForumsStore'
  import ForumListItem from './ForumListItem.vue'

  const props = defineProps({
    categoryId: { type: String, required: true },
  })

  const { start, end } = useProgressBar()

  const categoriesStore = useCategoriesStore()
  const { fetchCategory } = categoriesStore

  const forumsStore = useForumsStore()
  const { fetchForums } = forumsStore

  const category = computed(() => findById(categoriesStore.categories, props.categoryId) || {})

  const forums = computed(() =>
    forumsStore.forums.filter((forum) => forum.categoryId === props.categoryId)
  )

  const categoryExists = categoriesStore.categories.some(
    (category) => category.id === props.categoryId
  )

  if (!categoryExists) {
    start()
    const category = await fetchCategory(props.categoryId)
    await fetchForums(category.forums)
    end()
  }
</script>
