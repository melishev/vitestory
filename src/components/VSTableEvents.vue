<script setup lang="ts">
import VSCodeInline from './VSCodeInline.vue'

type EventData = {
  name: string
  description: string
  type: string
}

defineProps<{
  data: EventData[]
}>()
</script>

<template>
  <table style="display: table; width: 100%">
    <thead>
      <tr>
        <th><span>Name</span></th>
        <th><span>Description</span></th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(prop, index) in data" :key="`${prop.name}-${index}`">
        <td style="white-space: nowrap">
          <VSCodeInline :source="prop.name" />
        </td>

        <td>
          <VSCodeInline :source="prop.type" />
          <div>{{ prop.description }}</div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
