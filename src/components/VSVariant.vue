<script setup lang="ts">
  // TODO: add the ability to expand to full screen
  import { Button as VSButton } from './ui/button'
  import VSCode from './VSCode.vue';
  import { ref } from 'vue'
  import { Code } from 'lucide-vue-next';

  defineProps<{
    title?: string;
    source?: string;
    centering?: boolean;
    playground?: boolean;
  }>()

  const showCode = ref(false);
</script>

<template>
  <div class="vs-flex vs-items-center vs-justify-between vs-mt-6 vs-mb-2">
    <h3 v-if="playground" class="!vs-m-[unset]">Playground</h3>
    <h4 v-else class="!vs-m-[unset]">{{ title }}</h4>

    <VSButton v-if="source" @click="showCode = !showCode" variant="ghost" size="icon">
      <Code />
    </VSButton>
  </div>

  <div class="vs-w-full vs-my-4 vs-mx-0 vs-overflow-hidden vs-border vs-border-solid vs-border-[var(--vp-c-border)] vs-rounded-lg">
    <div class="vp-raw vs-flex vs-gap-5 vs-p-5">
      <div :class="['vs-flex-grow', { 'vs-flex vs-flex-grow vs-items-center vs-justify-center': centering }]">
        <slot />
      </div>

      <div v-if="$slots.controls && playground" class="vs-flex vs-flex-col vs-gap-2.5 vs-min-w-64 vs-max-w-64 vs-p-5 -vs-m-5 vs-ml-0 vs-overflow-y-scroll vs-bg-[var(--vp-c-bg-soft)]">
        <slot name="controls" />
      </div>
    </div>

    <VSCode v-if="source" v-show="showCode" :source="source" />
  </div>
</template>
