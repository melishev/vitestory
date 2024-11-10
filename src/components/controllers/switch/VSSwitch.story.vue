<script setup lang="ts">
import type { ViteStoryExposeOptions } from 'vitestory'
import { VSInput, VSVariant } from 'vitestory/components'
import { reactive } from 'vue'

import type { VSSwitchProps } from './types'
import VSSwitch from './VSSwitch.vue'

const state = reactive<{
  value: boolean
  title: VSSwitchProps['title']
}>({
  value: false,
  title: '',
})

defineExpose<ViteStoryExposeOptions>({
  title: 'VSSwitch',
  description:
    'One of the controllers that allows you to poke from false to true, then from true to false, or vice versa, or vice versa again',
  components: [VSSwitch],
})
</script>

<template>
  <VSVariant centering playground strategy="shadow">
    <VSSwitch v-model="state.value" :title="state.title" />

    <template #controls>
      <VSSwitch v-model="state.value" title="modelValue" />
      <VSInput v-model="state.title" title="title" />
    </template>
  </VSVariant>
</template>
