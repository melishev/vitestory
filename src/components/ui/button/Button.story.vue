<script setup lang="ts">
import { ChevronRight, Loader2, Mail } from 'lucide-vue-next'
import type { ViteStoryExposeOptions } from 'vitestory'
import { VSSelect, VSVariant } from 'vitestory/components'
import { reactive } from 'vue'

import Button from './Button.vue'
import { type ButtonVariants } from './index'

const optionsVariant: Record<'label' | 'value', NonNullable<ButtonVariants['variant']>>[] = [
  { label: 'default', value: 'default' },
  { label: 'destructive', value: 'destructive' },
  { label: 'ghost', value: 'ghost' },
  { label: 'link', value: 'link' },
  { label: 'outline', value: 'outline' },
  { label: 'secondary', value: 'secondary' },
]

const optionsSize: Record<'label' | 'value', NonNullable<ButtonVariants['size']>>[] = [
  { label: 'default', value: 'default' },
  { label: 'icon', value: 'icon' },
  { label: 'lg', value: 'lg' },
  { label: 'sm', value: 'sm' },
]

const state = reactive<{
  variant: NonNullable<ButtonVariants['variant']>
  size: NonNullable<ButtonVariants['size']>
}>({
  variant: 'default',
  size: 'default',
})

defineExpose<ViteStoryExposeOptions>({
  title: 'Button',
  description: 'Button is used to trigger some actions',
  components: [Button],
})
</script>

<template>
  <VSVariant
    title="Playground"
    playground
    source='<Button :variant="state.variant" :size="state.size">touch me</Button>'
  >
    <Button :variant="state.variant" :size="state.size">touch me</Button>

    <template #controls>
      <VSSelect v-model="state.variant" title="variant" :options="optionsVariant" />
      <VSSelect v-model="state.size" title="size" :options="optionsSize" />
    </template>
  </VSVariant>

  <h3>Examples</h3>

  <VSVariant title="Primary" source="<Button>Button</Button>">
    <Button>Button</Button>
  </VSVariant>

  <VSVariant title="Secondary" source='<Button variant="secondary">Secondary</Button>'>
    <Button variant="secondary">Secondary</Button>
  </VSVariant>

  <VSVariant title="Destructive" source='<Button variant="destructive">Destructive</Button>'>
    <Button variant="destructive">Destructive</Button>
  </VSVariant>

  <VSVariant title="Outline">
    <Button variant="outline"> Outline </Button>
  </VSVariant>

  <VSVariant title="Ghost">
    <Button variant="ghost"> Ghost </Button>
  </VSVariant>

  <VSVariant title="Link">
    <Button variant="link"> Link </Button>
  </VSVariant>

  <VSVariant title="Icon">
    <Button variant="outline" size="icon">
      <ChevronRight class="w-4 h-4" />
    </Button>
  </VSVariant>

  <VSVariant title="With Icon">
    <Button> <Mail class="w-4 h-4 mr-2" /> Login with Email </Button>
  </VSVariant>

  <VSVariant title="Loading">
    <Button disabled>
      <Loader2 class="w-4 h-4 mr-2 animate-spin" />
      Please wait
    </Button>
  </VSVariant>

  <VSVariant title="As Child">
    <Button as-child>
      <a href="/login"> Login </a>
    </Button>
  </VSVariant>
</template>
