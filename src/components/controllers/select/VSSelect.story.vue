<script setup lang="ts">
import type { ViteStoryExposeOptions } from 'vitestory'
import { VSInput, VSVariant } from 'vitestory/components'
import { reactive } from 'vue'

import type { VSSelectProps } from './types'
import VSSelect from './VSSelect.vue'

const state = reactive<{
  value: VSSelectProps['options'][number]['value']
  title: VSSelectProps['title']
  placeholder: VSSelectProps['placeholder']
  options: VSSelectProps['options']
}>({
  value: '',
  title: '',
  placeholder: '',
  options: [
    { label: 'Red', value: 'red' },
    { label: 'Green', value: 'green' },
    { label: 'Blue', value: 'blue' },
  ],
})

defineExpose<ViteStoryExposeOptions>({
  title: 'VSSelect',
  description: 'VSSelect',
  components: [VSSelect],
})
</script>

<template>
  <VSVariant playground>
    <VSSelect v-model="state.value" :title="state.title" :placeholder="state.placeholder" :options="state.options" />

    <template #controls>
      <VSInput v-model="state.value" title="value" />
      <VSInput v-model="state.title" title="title" />
      <VSInput v-model="state.placeholder" title="placeholder" />
      <pre>{{ state.options }}</pre>
    </template>
  </VSVariant>
</template>
