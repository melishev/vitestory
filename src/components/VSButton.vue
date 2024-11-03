<script setup lang="ts">
interface Props {
  test?: string
}
defineProps<Props>()
</script>

<template>
  <button class="vs-button">
    <slot />
  </button>
</template>

<style scoped>
.vs-button {
  border: 1px solid blue;
}
</style>