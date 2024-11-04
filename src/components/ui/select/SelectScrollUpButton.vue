<script setup lang="ts">
import { cn } from '../../../utils'
import { ChevronUp } from 'lucide-vue-next'
import { SelectScrollUpButton, type SelectScrollUpButtonProps, useForwardProps } from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<SelectScrollUpButtonProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <SelectScrollUpButton v-bind="forwardedProps" :class="cn('vs-flex vs-cursor-default vs-items-center vs-justify-center vs-py-1', props.class)">
    <slot>
      <ChevronUp class="vs-h-4 vs-w-4" />
    </slot>
  </SelectScrollUpButton>
</template>
