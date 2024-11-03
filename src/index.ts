import type { DefaultTheme, UserConfig, UserConfigExport } from 'vitepress'

// export * from './types'

function configMutation(config: UserConfig<DefaultTheme.Config>) {
  console.log(config)

  return config
}

export async function withViteStory(config: UserConfigExport<DefaultTheme.Config>): Promise<UserConfigExport<DefaultTheme.Config>> {
  if (typeof config === 'function') {
    return async (ctx) => {
      const userConfig = await config(ctx)
      return configMutation(userConfig)
    }
  }

  return configMutation(await config)
}