<template>
  <div
    class="inersection-observer"
    ref="elementToObserve"
  ></div>
</template>

<script setup>
  import { onMounted, onUnmounted, ref, watch } from 'vue'

  const props = defineProps({
    done: { type: Boolean, default: false },
  })

  const emit = defineEmits(['load'])

  const elementToObserve = ref(null)
  const observer = ref(null)

  onMounted(() => {
    observer.value = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) emit('load')
      })
    })
    observer.value.observe(elementToObserve.value)
  })

  onUnmounted(() => {
    observer.value.unobserve(elementToObserve.value)
  })

  watch(
    () => props.done,
    () => observer.value.unobserve(elementToObserve.value)
  )
</script>

<style scoped>
  div {
    position: relative;
    z-index: -1;
    pointer-events: none;
    bottom: 100px;
  }
</style>
