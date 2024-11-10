import fs from 'node:fs'
import path from 'node:path'

import type { DefaultTheme } from 'vitepress'

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

export const stories = getStoryPaths(path.resolve(__dirname, '../../src/components'))

export const sidebarComponents = stories.reduce<DefaultTheme.SidebarItem[]>((acc, pathToStory) => {
  if (pathToStory.includes('components/controllers')) return acc
  if (pathToStory.includes('components/ui')) return acc
  const text = path.basename(pathToStory).replace('.story.vue', '')

  acc.push({
    text,
    link: `/components/${text.toLowerCase()}`,
  })

  return acc
}, [])

export const sidebarComponentsControllers = stories.reduce<DefaultTheme.SidebarItem[]>((acc, pathToStory) => {
  if (!pathToStory.includes('components/controllers')) return acc
  const text = path.basename(pathToStory).replace('.story.vue', '')

  acc.push({
    text,
    link: `/components/${text.toLowerCase()}`,
  })

  return acc
}, [])

export const sidebarComponentsPrimitives = stories.reduce<DefaultTheme.SidebarItem[]>((acc, pathToStory) => {
  if (!pathToStory.includes('components/ui')) return acc
  const text = path.basename(pathToStory).replace('.story.vue', '')

  acc.push({
    text,
    link: `/components/${text.toLowerCase()}`,
  })

  return acc
}, [])
