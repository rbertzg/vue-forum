<template>
  <form @submit.prevent="reply">
    <div class="form-group">
      <label for="post-reply">Content:</label>
      <textarea
        v-model="replyText"
        id="post-reply"
        name="content"
        rows="8"
        cols="140"
        class="form-input"
      ></textarea>
    </div>
    <div class="btn-group">
      <button
        type="button"
        class="btn btn-ghost"
      >
        Cancel
      </button>
      <button
        type="submit"
        class="btn btn-blue"
      >
        Reply
      </button>
    </div>
  </form>
</template>

<script setup>
  import { ref } from 'vue'

  const emit = defineEmits(['reply'])

  const replyText = ref('')

  const reply = () => {
    emit('reply', replyText.value)
    replyText.value = ''
  }
</script>
