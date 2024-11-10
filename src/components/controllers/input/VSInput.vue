<script setup lang="ts">
import { Input } from '../../ui/input'
import type { VSInputProps } from './types'

defineProps<VSInputProps>()

const model = defineModel<string>({ required: true })
</script>

<template>
  <div class="vs-flex vs-flex-col vs-gap-1">
    <small class="vs-text-sm">{{ title }}</small>
    <Input v-model="model" :placeholder />
  </div>
</template>
