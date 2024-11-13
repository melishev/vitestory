import path from 'node:path'

import autoprefixer from 'autoprefixer'
import tailwind from 'tailwindcss'
import { defineConfig } from 'vitepress'
import { withViteStory } from 'vitestory'

import { en } from './en'
import { ru } from './ru'
import { stories } from './utils'

export default withViteStory(
  defineConfig({
    base: '/vitestory/',
    title: 'ViteStory',
    srcDir: 'docs',

    head: [['link', { rel: 'icon', href: '/logo.png' }]],

    themeConfig: {
      logo: '/logo.png',
      socialLinks: [{ icon: 'github', link: 'https://github.com/melishev/vitestory' }],
    },

    rewrites: {
      'en/:rest*': ':rest*',
    },

    locales: {
      root: { label: 'English', ...en },
      ru: { label: 'Русский', ...ru },
    },

    vite: {
      css: {
        postcss: {
          plugins: [tailwind(), autoprefixer()],
        },
      },
    },

    vitestory: {
      distDir: 'docs/components',
      pathToTSConfig: path.resolve(__dirname, '../../tsconfig.app.json'),
      stories,
    },
  }),
)
