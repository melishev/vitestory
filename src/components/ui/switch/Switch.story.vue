<script setup lang="ts">
import type { ViteStoryExposeOptions } from 'vitestory'

import Switch from './Switch.vue'

defineExpose<ViteStoryExposeOptions>({
  title: 'Switch',
  description: 'A control that allows the user to toggle between checked and not checked.',
  components: [Switch],
})
</script>
