import type { DefaultTheme, UserConfig, UserConfigExport } from 'vitepress'

import pluginRoutes from './routes.plugin'

export type * from './types'

function configMutation(config: UserConfig<DefaultTheme.Config>) {
  let viteConfig = config.vite
  if (!viteConfig) {
    viteConfig = {}
    config.vite = viteConfig
  }

  let vitePlugins = viteConfig.plugins
  if (!vitePlugins) {
    vitePlugins = []
    viteConfig.plugins = vitePlugins
  }

  vitePlugins.push(pluginRoutes(config.vitestory))

  return config
}

export async function withViteStory(
  config: UserConfigExport<DefaultTheme.Config>,
): Promise<UserConfigExport<DefaultTheme.Config>> {
  if (typeof config === 'function') {
    return async (ctx) => {
      const userConfig = await config(ctx)
      return configMutation(userConfig)
    }
  }

  return configMutation(await config)
}
