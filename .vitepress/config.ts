import fs from 'node:fs'
import path from 'node:path'

import autoprefixer from 'autoprefixer'
import tailwind from 'tailwindcss'
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
const sidebarStories = stories.map((pathToStory) => {
  const text = path.basename(pathToStory).replace('.story.vue', '')
  return {
    text,
    link: `/components/${text.toLowerCase()}`,
  }
})

export default withViteStory(
  defineConfig({
    title: 'ViteStory',
    description: 'A ViteStory Site',
    srcDir: 'docs',
    themeConfig: {
      logo: '/logo.png',
      socialLinks: [{ icon: 'github', link: 'https://github.com/melishev/vitestory' }],

      nav: [
        { text: 'Home', link: '/' },
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
            { text: 'About', link: '' },
            { text: 'Controllers', items: sidebarStories },
            { text: 'Primitives', items: sidebarStories },
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
