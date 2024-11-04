<script setup lang="ts">
import { cn } from '../../../utils'
import { ChevronDown } from 'lucide-vue-next'
import { SelectIcon, SelectTrigger, type SelectTriggerProps, useForwardProps } from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

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
    :class="cn(
      'vs-flex vs-h-10 vs-w-full vs-items-center vs-justify-between vs-rounded-md vs-border vs-border-input vs-bg-background vs-px-3 vs-py-2 vs-text-sm vs-ring-offset-background placeholder:vs-text-muted-foreground focus:vs-outline-none focus:vs-ring-2 focus:vs-ring-ring focus:vs-ring-offset-2 disabled:vs-cursor-not-allowed disabled:vs-opacity-50 [&>span]:vs-truncate vs-text-start',
      props.class,
    )"
  >
    <slot />
    <SelectIcon as-child>
      <ChevronDown class="vs-w-4 vs-h-4 vs-opacity-50 vs-shrink-0" />
    </SelectIcon>
  </SelectTrigger>
</template>
