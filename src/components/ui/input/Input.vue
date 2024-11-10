<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import type { HTMLAttributes } from 'vue'

import { cn } from '../../../utils'

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
  <input
    v-model="modelValue"
    :class="
      cn(
        'vs-flex vs-h-8 vs-w-full vs-rounded-md vs-border vs-border-solid vs-border-input vs-bg-background vs-px-3 vs-py-2 vs-text-sm placeholder:vs-text-muted-foreground focus-visible:vs-outline-none disabled:vs-cursor-not-allowed disabled:vs-opacity-50',
        props.class,
      )
    "
  />
</template>
