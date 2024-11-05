<script setup lang="ts">
import type { ViteStoryExposeOptions } from 'vitestory'

import Input from './Input.vue'

defineExpose<ViteStoryExposeOptions>({
  title: 'Input',
  description: 'Displays a form input field or a component that looks like an input field.',
  components: [Input],
})
</script>
