<script setup lang="ts">
// TODO: add the ability to expand to full screen
import { Code } from 'lucide-vue-next'
import { ref } from 'vue'

import { Button as VSButton } from './ui/button'
import VSCode from './VSCode.vue'

defineProps<{
  title?: string
  source?: string
  centering?: boolean
  playground?: boolean
}>()

const showCode = ref(false)
</script>

<template>
  <div class="vs-mb-2 vs-mt-6 vs-flex vs-items-center vs-justify-between">
    <h3 v-if="playground" class="!vs-m-[unset]">Playground</h3>
    <h4 v-else class="!vs-m-[unset]">{{ title }}</h4>

    <VSButton v-if="source" variant="ghost" size="icon" @click="showCode = !showCode">
      <Code />
    </VSButton>
  </div>

  <div
    class="vs-mx-0 vs-my-4 vs-w-full vs-overflow-hidden vs-rounded-lg vs-border vs-border-solid vs-border-[var(--vp-c-border)]"
  >
    <div class="vp-raw vs-flex vs-gap-5 vs-p-5">
      <div :class="['vs-flex-grow', { 'vs-flex vs-flex-grow vs-items-center vs-justify-center': centering }]">
        <slot />
      </div>

      <div
        v-if="$slots.controls && playground"
        class="-vs-m-5 vs-ml-0 vs-flex vs-min-w-64 vs-max-w-64 vs-flex-col vs-gap-2.5 vs-overflow-y-scroll vs-bg-[var(--vp-c-bg-soft)] vs-p-5"
      >
        <slot name="controls" />
      </div>
    </div>

    <VSCode v-if="source" v-show="showCode" :source="source" />
  </div>
</template>
