<script setup lang="ts">
import { Input } from '../ui/input'

defineProps<{
  title: string
  placeholder?: string
}>()

const model = defineModel<string>({ required: true })
</script>

<template>
  <div>
    <small>{{ title }}</small>
    <Input v-model="model" :placeholder />
  </div>
</template>
