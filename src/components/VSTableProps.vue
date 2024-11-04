<script setup lang="ts">
import VSCodeInline from './VSCodeInline.vue';

type PropData = {
  name: string;
  description: string;
  required: boolean;
  type: string;
  default: string;
  schema: any
};

defineProps<{
  data: PropData[];
}>();
</script>

<template>
  <table style="display: table; width: 100%;">
    <thead>
      <tr>
        <th><span>Name</span></th>
        <th><span>Description</span></th>
        <th><span>Default</span></th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(prop, index) in data" :key="`${prop.name}-${index}`">
        <td style="white-space: nowrap">
          <VSCodeInline :source="prop.name" />
          <sup style="color: var(--vp-c-caution-3)">{{ prop.required ? ' *' : null }}</sup>
        </td>

        <td>
          <VSCodeInline :source="prop.type" :schema="prop.schema" />
          <div>{{ prop.description }}</div>
        </td>

        <td>
          <VSCodeInline v-if="prop.default" :source="prop.default" />
          <template v-else>–</template>
        </td>
      </tr>
    </tbody>
  </table>
</template>
