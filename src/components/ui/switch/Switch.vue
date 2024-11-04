<script setup lang="ts">
// import { cn } from '@/utils'
import {
  SwitchRoot,
  type SwitchRootEmits,
  type SwitchRootProps,
  SwitchThumb,
  useForwardPropsEmits,
} from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<SwitchRootProps & { class?: HTMLAttributes['class'] }>()

const emits = defineEmits<SwitchRootEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <SwitchRoot
    v-bind="forwarded"
    :class="[
      'vs-peer vs-inline-flex vs-h-6 vs-w-11 vs-shrink-0 vs-cursor-pointer vs-items-center vs-rounded-full vs-border-2 vs-border-transparent vs-transition-colors focus-visible:vs-outline-none focus-visible:vs-ring-2 focus-visible:vs-ring-ring focus-visible:vs-ring-offset-2 focus-visible:vs-ring-offset-background disabled:vs-cursor-not-allowed disabled:vs-opacity-50 data-[state=checked]:vs-bg-primary data-[state=unchecked]:vs-bg-input',
      props.class,
    ]"
  >
    <SwitchThumb
      :class="['vs-pointer-events-none vs-block vs-h-5 vs-w-5 vs-rounded-full vs-bg-background vs-shadow-lg vs-ring-0 vs-transition-transform data-[state=checked]:vs-translate-x-5']"
    >
      <slot name="thumb" />
    </SwitchThumb>
  </SwitchRoot>
</template>
