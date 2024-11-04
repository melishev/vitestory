<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../../../utils'
import { SelectLabel, type SelectLabelProps } from 'radix-vue'

const props = defineProps<SelectLabelProps & { class?: HTMLAttributes['class'] }>()
</script>

<template>
  <SelectLabel :class="cn('vs-py-1.5 vs-pl-8 vs-pr-2 vs-text-sm vs-font-semibold', props.class)">
    <slot />
  </SelectLabel>
</template>
