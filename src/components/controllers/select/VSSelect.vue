<script setup lang="ts">
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select'
import type { VSSelectProps } from './types'

defineProps<VSSelectProps>()

const model = defineModel<VSSelectProps['options'][number]['value']>({ required: true })
</script>

<template>
  <div class="vs-flex vs-flex-col vs-gap-1">
    <small v-if="title" class="vs-text-sm vs-font-medium">{{ title }}</small>

    <Select v-model="model">
      <SelectTrigger>
        <SelectValue :placeholder />
      </SelectTrigger>

      <SelectContent>
        <SelectItem v-for="option in options" :key="option.value" :value="option.value">{{ option.label }}</SelectItem>
      </SelectContent>
    </Select>
  </div>
</template>
