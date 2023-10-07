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
    timestamp: { type: [Number, Object], required: true },
  })

  const normalizedTimestamp = computed(() => props.timestamp?.seconds || props.timestamp)

  // example: Thu, Aug 16, 2018 8:02 PM - depending on location
  const readableDate = computed(() => dayjs.unix(normalizedTimestamp.value).format('L LT'))
  // example: 3 years ago
  const readableFromNow = computed(() => dayjs.unix(normalizedTimestamp.value).fromNow())
</script>
