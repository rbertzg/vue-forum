<template>
  <div class="col-full">
    <form @submit.prevent="save">
      <div class="form-group">
        <textarea
          v-model="postCopy.text"
          name=""
          id=""
          cols="30"
          rows="10"
          class="form-input"
        />
      </div>
      <div class="form-actions">
        <button class="btn-blue">{{ post.id ? 'Update Post' : 'Submit post' }}</button>
      </div>
    </form>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const props = defineProps({
    post: { type: Object, default: () => ({ text: '' }) },
  })

  const emit = defineEmits(['save'])

  const postCopy = ref(props.post)

  const save = () => {
    emit('save', postCopy.value)
    postCopy.value.text = ''
  }
</script>
