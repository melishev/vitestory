<script setup lang="ts">
import { Switch } from '../../ui/switch'
import type { VSSwitchProps } from './types'

defineProps<VSSwitchProps>()

const model = defineModel<boolean>({ required: true })
</script>

<template>
  <div class="vs-flex vs-items-center vs-gap-x-1">
    <small class="vs-text-sm">{{ title }}</small>
    <Switch :checked="model" @update:checked="model = $event" />
  </div>
</template>
