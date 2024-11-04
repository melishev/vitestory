<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../../../utils'
import { useVModel } from '@vueuse/core'

const props = defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
  class?: HTMLAttributes['class']
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})
</script>

<template>
  <input v-model="modelValue" :class="cn('vs-flex vs-h-10 vs-w-full vs-rounded-md vs-border vs-border-input vs-bg-background vs-px-3 vs-py-2 vs-text-sm vs-ring-offset-background file:vs-border-0 file:vs-bg-transparent file:vs-text-sm file:vs-font-medium placeholder:vs-text-muted-foreground focus-visible:vs-outline-none focus-visible:vs-ring-2 focus-visible:vs-ring-ring focus-visible:vs-ring-offset-2 disabled:vs-cursor-not-allowed disabled:vs-opacity-50', props.class)">
</template>
