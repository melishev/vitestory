<script setup lang="ts">
import { Input } from '../../ui/input'
import type { VSInputProps } from './types'

defineProps<VSInputProps>()

const model = defineModel<string>()
</script>

<template>
  <div class="vs-flex vs-flex-col vs-gap-1">
    <small v-if="title" class="vs-text-sm vs-font-medium">{{ title }}</small>
    <Input v-model="model" :placeholder />
  </div>
</template>
