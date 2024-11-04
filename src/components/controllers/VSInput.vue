<script setup lang="ts">
import { Input } from '../ui/input'

const model = defineModel<string>({ required: true });

defineProps<{
  title: string;
  placeholder?: string;
}>();
</script>

<template>
  <div>
    <small>{{ title }}</small>
    <Input v-model="model" :placeholder />
  </div>
</template>