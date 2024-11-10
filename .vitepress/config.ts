import fs from 'node:fs'
import path from 'node:path'

import autoprefixer from 'autoprefixer'
import tailwind from 'tailwindcss'
import type { DefaultTheme } from 'vitepress'
import { defineConfig } from 'vitepress'
import { withViteStory } from 'vitestory'

function getStoryPaths(dir: string) {
  const results: string[] = []

  function walk(directory: string) {
    const files = fs.readdirSync(directory)

    files.forEach((file) => {
      const filePath = path.join(directory, file)
      const stat = fs.statSync(filePath)

      if (stat.isDirectory()) {
        walk(filePath)
      } else if (file.endsWith('.story.vue')) {
        results.push(filePath)
      }
    })
  }

  walk(dir)

  return results
}

const stories = getStoryPaths(path.resolve(__dirname, '../src/components'))
const sidebarComponentsControllers = stories.reduce<DefaultTheme.SidebarItem[]>((acc, pathToStory) => {
  if (!pathToStory.includes('components/controllers')) return acc
  const text = path.basename(pathToStory).replace('.story.vue', '')

  acc.push({
    text,
    link: `/components/${text.toLowerCase()}`,
  })

  return acc
}, [])
const sidebarComponentsPrimitives = stories.reduce<DefaultTheme.SidebarItem[]>((acc, pathToStory) => {
  if (!pathToStory.includes('components/ui')) return acc
  const text = path.basename(pathToStory).replace('.story.vue', '')

  acc.push({
    text,
    link: `/components/${text.toLowerCase()}`,
  })

  return acc
}, [])

export default withViteStory(
  defineConfig({
    title: 'ViteStory',
    description: 'A ViteStory Site',
    srcDir: 'docs',
    themeConfig: {
      logo: '/logo.png',
      socialLinks: [{ icon: 'github', link: 'https://github.com/melishev/vitestory' }],

      nav: [
        { text: 'Getting Started', link: '/getting-started' },
        { text: 'Components', link: '/components' },
      ],

      sidebar: [
        { text: 'Yet another?', link: '/yet-another' },
        { text: 'Getting Started', link: '/getting-started' },
        {
          text: 'Modules',
          items: [
            { text: 'API Parser', link: '' },
            { text: 'Story Parser', link: '' },
            { text: 'Render Strategies', link: '' },
          ],
        },
        {
          text: 'Components',
          items: [
            { text: 'About', link: '/components' },
            { text: 'Controllers', items: sidebarComponentsControllers },
            { text: 'Primitives', items: sidebarComponentsPrimitives },
          ],
        },
      ],
    },

    head: [['link', { rel: 'icon', href: '/logo.png' }]],

    vite: {
      css: {
        postcss: {
          plugins: [tailwind(), autoprefixer()],
        },
      },
    },

    vitestory: {
      distDir: 'docs/components',
      pathToTSConfig: path.resolve(__dirname, '../tsconfig.app.json'),
      stories,
    },
  }),
)
