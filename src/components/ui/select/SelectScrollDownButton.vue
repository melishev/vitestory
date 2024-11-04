<script setup lang="ts">
import { cn } from '../../../utils'
import { ChevronDown } from 'lucide-vue-next'
import { SelectScrollDownButton, type SelectScrollDownButtonProps, useForwardProps } from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<SelectScrollDownButtonProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <SelectScrollDownButton v-bind="forwardedProps" :class="cn('vs-flex vs-cursor-default vs-items-center vs-justify-center vs-py-1', props.class)">
    <slot>
      <ChevronDown class="vs-h-4 vs-w-4" />
    </slot>
  </SelectScrollDownButton>
</template>
