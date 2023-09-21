<template>
  <h1>Welcome to the Forum</h1>
  <ForumList :forums="forums" />
</template>

<script setup>
import sourceData from '@/data.json';
import { ref } from 'vue';
import ForumList from '../components/ForumList.vue';

const forums = ref(sourceData.forums)
</script>
