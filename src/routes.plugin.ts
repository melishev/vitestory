import fs from 'node:fs/promises'
import path from 'node:path'

import type { Plugin } from 'vite'

import { storyImportsExtractor } from './modules/story-parser'

export interface PluginOptions {
  /** The directory where the files will be generated to */
  distDir: string
  pathToTSConfig: string
  /** An array of paths pointing to the components on which the stories will be based */
  stories: string[]
}

const key = 'slug'
const key2 = 'meta'

const cautionString = 'Automatically generated ViteStory file. Do not modify it manually!'

function prepareContentStory() {
  return `
<!-- ${cautionString} -->

<script setup lang="ts">
import { useData } from 'vitepress'
import { defineAsyncComponent } from 'vue'
import { VSTableProps, VSTableEvents, VSTableSlots } from 'vitestory/components'
import { data } from './vitestory.data.js'

const { params } = useData()
const additionalParams = data[params.value.pathToStory.replace(/.*(?=src)/, '')]

const StoryComponent = defineAsyncComponent(() => import(params.value.pathToStory))
</script>

# {{ additionalParams.title }}

{{ additionalParams.description }}

<StoryComponent />

<template v-for="key of Object.keys(additionalParams.${key2})" :key="key">
  <h3>{{ key }} API</h3>
  
  <template v-if="additionalParams.${key2}[key].props.length">
    <h4>Props</h4>
    <VSTableProps :data="additionalParams.${key2}[key].props" />
  </template>

  <template v-if="additionalParams.${key2}[key].events.length">
    <h4>Events</h4>
    <VSTableEvents :data="additionalParams.${key2}[key].events" />
  </template>

  <template v-if="additionalParams.${key2}[key].slots.length">
    <h4>Slots</h4>
    <VSTableSlots :data="additionalParams.${key2}[key].slots" />
  </template>
</template>
`.trim()
}

function prepareContentPaths(paths: string[]): string {
  return `
// ${cautionString}
import path from 'node:path'

const originalPaths = ${JSON.stringify(paths)}

export default {
  async paths() {
    return originalPaths.map((pathToStory) => {
      const fileName = path.basename(pathToStory).replace('.story.vue', '')

      return {
        params: {
          ${key}: fileName.toLowerCase(),
          pathToStory,
        }
      }
    })
  }
}
`.trim()
}

function prepareContentData(pathToFiles: string[], pathToTSConfig: string): string {
  return `
// ${cautionString}
import fs from 'node:fs'
import { filterMetadata, parseMetadata, setupChecker, storyMetaDataExtractor } from 'vitestory/modules'

const dataStory = {}
const dataComponent = {}

const cacheStat = new Map()

const checker = setupChecker('${pathToTSConfig}')

const watch = ${JSON.stringify(pathToFiles)}

export default {
  watch,
  async load(pathsToFile) {
    for (const pathToFile of pathsToFile) {
      const cached = cacheStat.get(pathToFile)
      const timestamp = fs.statSync(pathToFile).mtimeMs

      if (cached && cached === timestamp) {
        continue
      }

      const isPathToStory = pathToFile.endsWith('.story.vue')

      if (isPathToStory) {
        const dataAboutStory = await storyMetaDataExtractor(pathToFile)
        dataStory[pathToFile] = dataAboutStory
      }

      if (!isPathToStory) {
        checker.clearCache() // !!
        const data = parseMetadata(checker, pathToFile)
        const filteredMeta = filterMetadata(data)
        dataComponent[pathToFile] = filteredMeta
      }

      cacheStat.set(pathToFile, timestamp)
      console.log('Refreshed:', pathToFile)
    }

    for (const key in dataStory) {
      for (const key2 in dataStory[key]) {
        if (key2 !== 'components') continue
        if (!Object.keys(dataStory[key][key2]).length) continue

        dataStory[key].meta = { ...dataStory[key][key2] }
        for (const key2 in dataStory[key].meta) {
          dataStory[key].meta[key2] = dataComponent[dataStory[key].meta[key2]]
        }
      }
    }

    return dataStory
  }
}
`
}

function flattenObjectToArray(obj: Record<string, Record<string, string>>): string[] {
  const result: string[] = []

  for (const outerKey in obj) {
    const innerObject = obj[outerKey]

    for (const innerKey in innerObject) {
      result.push(outerKey, innerObject[innerKey])
    }
  }

  return result
}

export default function (options: PluginOptions): Plugin {
  const getFullPath = (fileName: string) => path.resolve(process.cwd(), options.distDir, fileName)

  const storiesDependencies: Record<string, Record<string, string>> = {}

  const dataFiles = [
    { fileName: `[${key}].md`, content: prepareContentStory() },
    { fileName: `[${key}].paths.js`, content: prepareContentPaths(options.stories) },
  ]

  return {
    name: 'vitestory:routes',

    async buildStart() {
      // 1. Cервис определяющий все файлы-зависимости, которые следует отслеживать для обновления истории
      for (const pathToStory of options.stories) {
        const data = await storyImportsExtractor(pathToStory)
        storiesDependencies[pathToStory] = data
      }

      dataFiles.push({
        fileName: `vitestory.data.js`,
        content: prepareContentData(flattenObjectToArray(storiesDependencies), options.pathToTSConfig),
      })

      // 2. Создаем выполняемые файлы
      for (const { fileName, content } of dataFiles) {
        const fullPath = getFullPath(fileName)

        try {
          await fs.mkdir(path.dirname(fullPath), { recursive: true })
          await fs.writeFile(fullPath, content)
          console.log(`File created: ${fullPath}`)
        } catch (error) {
          console.error(`Error when creating a file: ${error}`)
        }
      }
    },

    async closeBundle() {
      for (const { fileName } of dataFiles) {
        const fullPath = getFullPath(fileName)

        try {
          await fs.unlink(fullPath)
          console.log(`Temporary file has been deleted: ${fullPath}`)

          let dir = path.dirname(fullPath)
          while (dir !== path.dirname(dir)) {
            try {
              await fs.rmdir(dir)
              console.log(`Deleted directory: ${dir}`)
              dir = path.dirname(dir)
            } catch (error) {
              if (error.code === 'ENOTEMPTY' || error.code === 'ENOENT') break
              throw error
            }
          }
        } catch (error) {
          console.error(`Error when deleting a temporary file or directories: ${error}`)
        }
      }
    },
  }
}
