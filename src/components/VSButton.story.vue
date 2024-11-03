<script setup lang="ts">
import type { ViteStoryExposeOptions } from '../types'
import VSButton from './VSButton.vue';

defineExpose<ViteStoryExposeOptions>({
  slug: 'button',
  title: 'Button',
  description: 'Button is used to trigger some actions',
  components: [VSButton],
})
</script>

<template>
  <VSButton>touch me</VSButton>
</template>
