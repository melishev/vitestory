<script setup lang="ts">
import type { ViteStoryExposeOptions } from 'vitestory'
import { VSVariant } from 'vitestory/components'
import Button from './Button.vue'
import { Input } from '../input'
import { Switch } from '../switch'

import { ChevronRight, Mail, Loader2 } from 'lucide-vue-next'

defineExpose<ViteStoryExposeOptions>({
  slug: 'button',
  title: 'Button',
  description: 'Button is used to trigger some actions',
  components: [Button],
})
</script>

<template>
  <VSVariant title="Playground">
    <Button>touch me</Button>

    <template #controls>
      <Input type="email" placeholder="Email" />
      <Switch />
    </template>
  </VSVariant>

  <h3>Examples</h3>

  <VSVariant title="Primary">
    <Button>Button</Button>
  </VSVariant>

  <VSVariant title="Secondary">
    <Button variant="secondary"> Secondary </Button>
  </VSVariant>

  <VSVariant title="Destructive">
    <Button variant="destructive"> Destructive </Button>
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
