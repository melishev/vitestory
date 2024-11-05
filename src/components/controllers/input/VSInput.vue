<script setup lang="ts">
import { Input } from '../../ui/input'
import type { VSInputProps } from './types'

defineProps<VSInputProps>()

const model = defineModel<string>({ required: true })
</script>

<template>
  <div>
    <small>{{ title }}</small>
    <Input v-model="model" :placeholder />
  </div>
</template>
