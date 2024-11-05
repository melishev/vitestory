<script setup lang="ts">
import { Switch } from '../../ui/switch'
import type { VSSwitchProps } from './types'

defineProps<VSSwitchProps>()

const model = defineModel<boolean>({ required: true })
</script>

<template>
  <div>
    <small>{{ title }}</small>
    <Switch :checked="model" @update:checked="model = $event" />
  </div>
</template>
