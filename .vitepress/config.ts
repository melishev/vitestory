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
      logo: 'https://em-content.zobj.net/source/apple/391/classical-building_1f3db-fe0f.png',
      socialLinks: [{ icon: 'github', link: 'https://github.com/melishev/vitestory' }],

      nav: [
        { text: 'Home', link: '/' },
        { text: 'Components', link: '/components' },
      ],

      sidebar: sidebarStories,
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
      pathToTSConfig: path.resolve(__dirname, '../tsconfig.app.json'),
      stories,
    },
  }),
)
