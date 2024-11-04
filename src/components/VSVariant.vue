<script setup lang="ts">
  // TODO: add the ability to expand to full screen
  import VSButton from './VSButton.vue';
  import VSCode from './VSCode.vue';
  import { ref } from 'vue'

  defineProps<{
    title: string;
    source?: string;
    centering?: boolean;
  }>();

  const showCode = ref(false);
</script>

<template>
  <div class="variant-title">
    <h4>{{ title }}</h4>

    <VSButton @click="showCode = !showCode">
      {{ '</>' }}
    </VSButton>
  </div>

  <div class="variant">
    <div class="vp-raw variant-playground">
      <div :class="{ centering: centering }">
        <slot />
      </div>

      <div v-if="$slots.controls" class="controls">
        <slot name="controls" />
      </div>
    </div>

    <VSCode v-if="source" v-show="showCode" class="variant-code" :source="source" />
  </div>
</template>

<style>
  .variant-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 24px 0 8px;

    h4 {
      margin: unset;
    }
  }

  .variant {
    --vs-indent: 20px;

    width: 100%;
    margin: 16px 0;
    overflow: hidden;
    border: 1px solid var(--vp-c-border);
    border-radius: 8px;

    .variant-playground {
      display: flex;
      gap: var(--vs-indent);
      padding: var(--vs-indent);

      > div {
        flex-grow: 1;
      }

      > .centering {
        display: flex;
        flex-grow: 1;
        align-items: center;
        justify-content: center;
      }

      > .controls {
        display: flex;
        flex-direction: column;
        gap: 10px;
        min-width: 260px;
        max-width: 260px;
        padding: var(--vs-indent);
        margin: calc(var(--vs-indent) * -1) calc(var(--vs-indent) * -1) calc(var(--vs-indent) * -1) 0;
        overflow-y: scroll;
        background: rgb(238 238 238);
        background: var(--vp-c-bg-soft);
      }
    }
  }
</style>
