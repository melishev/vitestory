import type { Component } from 'vue'

import type { PluginOptions as RoutesOptions } from './routes.plugin'

declare module 'vitepress' {
  interface UserConfig {
    vitestory: ViteStoryPluginRoutesOptions
  }
}

export interface ViteStoryExposeOptions {
  slug: string
  title: string
  description: string
  components: Component[]
}

export type ViteStoryPluginRoutesOptions = RoutesOptions
