<script setup lang="ts">
import { codeToHtml } from 'shiki';
import { onMounted, ref } from 'vue';

const props = defineProps<{
  source: string
}>()

async function transformSource(source: string): Promise<string> {
  return await codeToHtml(source, {
    lang: 'ts',
    theme: 'github-light',
    structure: 'inline'
  })
}

const code = ref('')

onMounted(async () => {
  code.value = await transformSource(props.source)
})
</script>

<template>
  <code v-html="code" />
</template>
