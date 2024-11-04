<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { codeToHtml } from 'shiki';

  const props = withDefaults(defineProps<{
    source: string;
    lang?: Parameters<typeof codeToHtml>['1']['lang']
  }>(), {
    lang: 'ts'
  });

  const highlightedCode = ref<string>('');

  onMounted(async () => {
    highlightedCode.value = await codeToHtml(props.source.trim(), {
      lang: props.lang,
      theme: 'github-light',
    })
  });
</script>

<template>
  <div class="vs-overflow-x-auto vs-bg-[var(--vp-code-block-bg)]">
    <div class="code" v-html="highlightedCode"></div>
  </div>
</template>

<style>
  .code {
    pre {
      position: relative;
      z-index: 1;
      padding: 20px 0;
      margin: 0;
      overflow-x: auto;
      background: transparent !important;
    }

    code {
      display: block;
      width: fit-content;
      min-width: 100%;
      padding: 0 24px;
      font-size: var(--vp-code-font-size);
      line-height: var(--vp-code-line-height);
      color: var(--vp-code-block-color);
      transition: color 0.5s;
    }
  }
</style>
