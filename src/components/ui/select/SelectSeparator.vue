<script setup lang="ts">
import { SelectSeparator, type SelectSeparatorProps } from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

import { cn } from '../../../utils'

const props = defineProps<SelectSeparatorProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <SelectSeparator v-bind="delegatedProps" :class="cn('vs--mx-1 vs-my-1 vs-h-px vs-bg-muted', props.class)" />
</template>
