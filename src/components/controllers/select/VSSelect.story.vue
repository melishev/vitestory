<script setup lang="ts">
import type { ViteStoryExposeOptions } from 'vitestory'
import { VSInput, VSVariant } from 'vitestory/components'
import { computed, reactive } from 'vue'

import type { VSSelectProps } from './types'
import VSSelect from './VSSelect.vue'

const state = reactive<{
  value: VSSelectProps['options'][number]['value']
  title: VSSelectProps['title']
  placeholder: VSSelectProps['placeholder']
  options: VSSelectProps['options']
}>({
  value: 'red',
  title: '',
  placeholder: '',
  options: [
    { label: 'Red', value: 'red' },
    { label: 'Green', value: 'green' },
    { label: 'Blue', value: 'blue' },
  ],
})

const mirroredOptions = computed(() => state.options.map((option) => ({ ...option, label: option.value })))

defineExpose<ViteStoryExposeOptions>({
  title: 'VSSelect',
  description: 'One of the controllers that allows you to display a list of options and select one to transmit',
  components: [VSSelect],
})
</script>

<template>
  <VSVariant centering playground strategy="shadow">
    <VSSelect v-model="state.value" :title="state.title" :placeholder="state.placeholder" :options="state.options" />

    <template #controls>
      <VSSelect v-model="state.value" title="modelValue" :options="mirroredOptions" />
      <VSInput v-model="state.title" title="title" />
      <VSInput v-model="state.placeholder" title="placeholder" />
      <!-- TODO: add controller for objects and arrays data type -->
    </template>
  </VSVariant>
</template>
