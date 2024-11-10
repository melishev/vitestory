<script setup lang="ts">
import { Switch } from '../../ui/switch'
import type { VSSwitchProps } from './types'

defineProps<VSSwitchProps>()

const model = defineModel<boolean>()
</script>

<template>
  <div class="vs-flex vs-items-center vs-justify-between vs-gap-x-1">
    <small v-if="title" class="vs-text-sm vs-font-medium">{{ title }}</small>
    <Switch :checked="model" @update:checked="model = $event" />
  </div>
</template>
