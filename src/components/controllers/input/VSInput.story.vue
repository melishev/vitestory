<script setup lang="ts">
import type { ViteStoryExposeOptions } from 'vitestory'
import { VSVariant } from 'vitestory/components'
import { reactive } from 'vue'

import type { VSInputProps } from './types'
import VSInput from './VSInput.vue'

const state = reactive<{
  value: string
  title: VSInputProps['title']
  placeholder: VSInputProps['placeholder']
}>({
  value: '',
  title: '',
  placeholder: '',
})

defineExpose<ViteStoryExposeOptions>({
  title: 'VSInput',
  description: 'One of the controllers that allows you to manipulate the string',
  components: [VSInput],
})
</script>

<template>
  <VSVariant centering playground strategy="shadow">
    <VSInput v-model="state.value" :title="state.title" :placeholder="state.placeholder" />

    <template #controls>
      <VSInput v-model="state.value" title="modelValue" />
      <VSInput v-model="state.title" title="title" />
      <VSInput v-model="state.placeholder" title="placeholder" />
    </template>
  </VSVariant>
</template>
