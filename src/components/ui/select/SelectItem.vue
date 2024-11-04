<script setup lang="ts">
import { cn } from '../../../utils'
import { Check } from 'lucide-vue-next'
import {
  SelectItem,
  SelectItemIndicator,
  type SelectItemProps,
  SelectItemText,
  useForwardProps,
} from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<SelectItemProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <SelectItem
    v-bind="forwardedProps"
    :class="
      cn(
        'vs-relative vs-flex vs-w-full vs-cursor-default vs-select-none vs-items-center vs-rounded-sm vs-py-1.5 vs-pl-8 vs-pr-2 vs-text-sm vs-outline-none focus:vs-bg-accent focus:vs-text-accent-foreground data-[disabled]:vs-pointer-events-none data-[disabled]:vs-opacity-50',
        props.class,
      )
    "
  >
    <span class="vs-absolute vs-left-2 vs-flex vs-h-3.5 vs-w-3.5 vs-items-center vs-justify-center">
      <SelectItemIndicator>
        <Check class="vs-h-4 vs-w-4" />
      </SelectItemIndicator>
    </span>

    <SelectItemText>
      <slot />
    </SelectItemText>
  </SelectItem>
</template>
