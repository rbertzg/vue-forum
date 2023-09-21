<template>
  <span :title="readableDate">
    {{ readableFromNow }}
  </span>
</template>

<script setup>
  import dayjs from 'dayjs'
  import localizedDate from 'dayjs/plugin/localizedFormat'
  import relativeTime from 'dayjs/plugin/relativeTime'
  import { computed } from 'vue'

  dayjs.extend(relativeTime)
  dayjs.extend(localizedDate)

  const props = defineProps({
    timestamp: { type: Number, required: true },
  })

  // example: Thu, Aug 16, 2018 8:02 PM - depending on location
  const readableDate = computed(() =>
    dayjs.unix(props.timestamp).format('L LT')
  )
  // example: 3 years ago
  const readableFromNow = computed(() => dayjs.unix(props.timestamp).fromNow())
</script>
