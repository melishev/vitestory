<script setup lang="ts">
import { ChevronDown } from 'lucide-vue-next'
import { SelectIcon, SelectTrigger, type SelectTriggerProps, useForwardProps } from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

import { cn } from '../../../utils'

const props = defineProps<SelectTriggerProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <SelectTrigger
    v-bind="forwardedProps"
    :class="
      cn(
        'vs-flex vs-h-8 vs-w-full vs-items-center vs-justify-between vs-rounded-md vs-border vs-border-solid vs-border-input vs-bg-background vs-px-3 vs-py-2 vs-text-start vs-text-sm placeholder:vs-text-muted-foreground focus:vs-outline-none disabled:vs-cursor-not-allowed disabled:vs-opacity-50 [&>span]:vs-truncate',
        props.class,
      )
    "
  >
    <slot />
    <SelectIcon as-child>
      <ChevronDown class="vs-h-4 vs-w-4 vs-shrink-0 vs-opacity-50" />
    </SelectIcon>
  </SelectTrigger>
</template>
