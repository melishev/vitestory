import type { PluginOptions as RoutesOptions } from "./routes.plugin"

declare module 'vitepress' {
  interface UserConfig {
    vitestory: ViteStoryPluginRoutesOptions
  }
}

export type ViteStoryPluginRoutesOptions = RoutesOptions