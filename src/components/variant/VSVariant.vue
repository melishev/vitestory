<script setup lang="ts">
// TODO: add the ability to expand to full screen
import { Code } from 'lucide-vue-next'
import { h, ref, useSlots } from 'vue'

import strategyNative from '../native.strategy'
import strategyShadow from '../shadow.strategy'
import { Button as VSButton } from '../ui/button'
import VSCode from '../VSCode.vue'
import type { VSVariantProps, VSVariantSlots } from './types'

const props = withDefaults(defineProps<VSVariantProps>(), { strategy: 'native' })
defineSlots<VSVariantSlots>()

const showCode = ref(props.playground)
const boxRef = ref<HTMLDivElement | null>(null)

const slots = useSlots()

switch (props.strategy) {
  case 'native':
    strategyNative(boxRef, h(slots.default))
    break
  case 'shadow':
    strategyShadow(boxRef, h(slots.default), slots.default()[0].type.__name)
    break
}
</script>

<template>
  <div class="vs-my-6">
    <div class="vs-mb-2">
      <div class="vs-flex vs-items-center vs-justify-between">
        <h3 v-if="playground" class="!vs-m-[unset]">Playground</h3>
        <h4 v-else-if="title" class="!vs-m-[unset]">{{ title }}</h4>

        <VSButton v-if="source" variant="ghost" size="icon" @click="showCode = !showCode">
          <Code />
        </VSButton>
      </div>

      <p v-if="description">{{ description }}</p>
    </div>

    <div
      class="vs-mx-0 vs-my-4 vs-w-full vs-overflow-hidden vs-rounded-lg vs-border vs-border-solid vs-border-[var(--vp-c-border)]"
    >
      <div class="vp-raw vs-flex vs-gap-5 vs-p-5">
        <div
          ref="boxRef"
          :class="['vs-flex-grow', { 'vs-flex vs-flex-grow vs-items-center vs-justify-center': centering }]"
        />

        <div
          v-if="$slots.controls && playground"
          class="-vs-m-5 vs-ml-0 vs-flex vs-min-w-64 vs-max-w-64 vs-flex-col vs-gap-2.5 vs-overflow-y-scroll vs-bg-[var(--vp-c-bg-soft)] vs-p-5"
        >
          <slot name="controls" />
        </div>
      </div>

      <VSCode v-if="source" v-show="showCode" :source="source" />
    </div>
  </div>
</template>
