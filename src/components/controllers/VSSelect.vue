<script setup lang="ts">
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

interface VSSelectOption {
  label: string
  value: string
}

defineProps<{
  title: string
  options?: VSSelectOption[]
  placeholder?: string
}>()

const model = defineModel<VSSelectOption['value']>({ required: true })
</script>

<template>
  <div>
    <small>{{ title }}</small>

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
