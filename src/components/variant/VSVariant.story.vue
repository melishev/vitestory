<script setup lang="ts">
import type { ViteStoryExposeOptions } from 'vitestory'
import { VSInput, VSSelect, VSSwitch } from 'vitestory/components'
import { reactive, ref } from 'vue'

import { VSVariantProps } from './types'
import VSVariant from './VSVariant.vue'

const optionsStrategy = [
  { label: 'native', value: 'native' },
  { label: 'shadow', value: 'shadow' },
]

const state = reactive<VSVariantProps>({
  title: '',
  description: '',
  source: '',
  centering: false,
  playground: false,
  strategy: 'native',
})

defineExpose<ViteStoryExposeOptions>({
  title: 'VSVariant',
  description: 'Necessary to distinguish between the component use case and additional content',
  components: [VSVariant],
})

const text = ref('Wow, this text is inside “VSVariant”, inside “VSVariant”')
</script>

<template>
  <VSVariant centering playground strategy="shadow">
    <VSVariant v-bind="state">
      <p>{{ text }}</p>

      <template #controls>
        <VSInput v-model="text" title="text" />
      </template>
    </VSVariant>

    <template #controls>
      <VSInput v-model="state.title" title="title" />
      <VSInput v-model="state.description" title="description" />
      <VSInput v-model="state.source" title="source" />
      <VSSwitch v-model="state.centering" title="centering" />
      <VSSwitch v-model="state.playground" title="playground" />
      <VSSelect v-model="state.strategy" title="strategy" :options="optionsStrategy" />
    </template>
  </VSVariant>

  <p>
    VSVariant provides two primary display modes: Playground and Example. The main difference is that Playground
    includes controllers for interacting with the demo within VSVariant. This setup is intended to establish a clear
    distinction: one Playground per story, with the remaining demos in Example mode. However, this is more of a
    recommendation than a strict rule.
  </p>

  <VSVariant
    title="Example #1 - Playground"
    description="Playground can display the controllers passed to it. Specifying a title is optional — the default title is 'Playground'"
    centering
  >
    <VSVariant centering playground>
      <p>{{ text }}</p>

      <template #controls>
        <VSInput v-model="text" title="text" />
      </template>
    </VSVariant>
  </VSVariant>

  <VSVariant
    title="Example #2 - Example"
    description="Example enables a clean display of a component or demo defined by the developer"
    centering
  >
    <VSVariant centering>
      <p>{{ text }}</p>
    </VSVariant>
  </VSVariant>
</template>
