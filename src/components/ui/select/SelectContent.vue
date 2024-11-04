<script setup lang="ts">
import { cn } from '../../../utils'
import {
  SelectContent,
  type SelectContentEmits,
  type SelectContentProps,
  SelectPortal,
  SelectViewport,
  useForwardPropsEmits,
} from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'
import { SelectScrollDownButton, SelectScrollUpButton } from '.'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<SelectContentProps & { class?: HTMLAttributes['class'] }>(),
  {
    position: 'popper',
  },
)
const emits = defineEmits<SelectContentEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <SelectPortal>
    <SelectContent
      v-bind="{ ...forwarded, ...$attrs }" :class="cn(
        'vs-relative vs-z-50 vs-max-h-96 vs-min-w-32 vs-overflow-hidden vs-rounded-md vs-border vs-bg-popover vs-text-popover-foreground vs-shadow-md data-[state=open]:vs-animate-in data-[state=closed]:vs-animate-out data-[state=closed]:vs-fade-out-0 data-[state=open]:vs-fade-in-0 data-[state=closed]:vs-zoom-out-95 data-[state=open]:vs-zoom-in-95 data-[side=bottom]:vs-slide-in-from-top-2 data-[side=left]:vs-slide-in-from-right-2 data-[side=right]:vs-slide-in-from-left-2 data-[side=top]:vs-slide-in-from-bottom-2',
        position === 'popper'
          && 'data-[side=bottom]:vs-translate-y-1 data-[side=left]:vs--translate-x-1 data-[side=right]:vs-translate-x-1 data-[side=top]:vs--translate-y-1',
        props.class,
      )
      "
    >
      <SelectScrollUpButton />
      <SelectViewport :class="cn('vs-p-1', position === 'popper' && 'vs-h-[--radix-select-trigger-height] vs-w-full vs-min-w-[--radix-select-trigger-width]')">
        <slot />
      </SelectViewport>
      <SelectScrollDownButton />
    </SelectContent>
  </SelectPortal>
</template>
