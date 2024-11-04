<script setup lang="ts">
import { cn } from '../../../utils'
import { SelectGroup, type SelectGroupProps } from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<SelectGroupProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <SelectGroup :class="cn('vs-p-1 vs-w-full', props.class)" v-bind="delegatedProps">
    <slot />
  </SelectGroup>
</template>
