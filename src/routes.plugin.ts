import path from "node:path";
import fs from 'node:fs/promises'
import type { Plugin } from "vite";

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
---
layout: doc
aside: false
---

<!-- ${cautionString} -->

<script setup lang="ts">
import { VSTableProps, VSTableEvents, VSTableSlots } from 'vitestory/components'
</script>

# {{ $params.title }}

{{ $params.description }}

## Data
<pre>
  {{ $params }}
</pre>

<template v-for="key of Object.keys($params.${key2})" :key="key">
  <h3>{{ key }} API</h3>
  
  <template v-if="$params.${key2}[key].props.length">
    <h4>Props</h4>
    <VSTableProps :data="$params.${key2}[key].props" />
  </template>

  <template v-if="$params.${key2}[key].events.length">
    <h4>Events</h4>
    <VSTableEvents :data="$params.${key2}[key].events" />
  </template>

  <template v-if="$params.${key2}[key].slots.length">
    <h4>Slots</h4>
    <VSTableSlots :data="$params.${key2}[key].slots" />
  </template>
</template>
`.trim()
}

function prepareContentPaths(paths: string[], pathToTSConfig: string): string {
  return `
// ${cautionString}
import path from 'node:path'
import { moduleStoryParser, setupChecker, parseMetadata, filterMetadata } from 'vitestory/modules'

export default {
  async paths() {
    const paths = []

    const checker = setupChecker('${pathToTSConfig}');

    for (const pathToStory of ${JSON.stringify(paths)}) {
      const dataAboutStory = await moduleStoryParser(pathToStory)
      const ${key2} = {}

      for (const [name, path] of dataAboutStory.components.entries()) {
        const data = parseMetadata(checker, path);
        const filteredMeta = filterMetadata(data);

        Object.assign(${key2}, { [name]: filteredMeta })
      }

      delete dataAboutStory.components

      paths.push({
        params: {
          ...dataAboutStory,
          ${key2},
        }
      })
    }

    return paths
  }
}
`.trim()
}

export default function(options: PluginOptions): Plugin {
  const getFullPath = (fileName: string) => path.resolve(process.cwd(), options.distDir, fileName)

  const dataFiles = [
    { fileName: `[${key}].md`, content: prepareContentStory() }, 
    { fileName: `[${key}].paths.js`, content: prepareContentPaths(options.stories, options.pathToTSConfig) },
  ]

  return {
    name: 'vitestory:routes',

    async buildStart() {
      for (const { fileName, content } of dataFiles) {
        const fullPath = getFullPath(fileName)

        try {
          await fs.mkdir(path.dirname(fullPath), { recursive: true });
          await fs.writeFile(fullPath, content);
          console.log(`File created: ${fullPath}`);
        } catch (error) {
          console.error(`Error when creating a file: ${error}`);
        }
      }
    },

    async closeBundle() {
      for (const { fileName } of dataFiles) {
        const fullPath = getFullPath(fileName)

        try {
          await fs.unlink(fullPath);
          console.log(`Temporary file has been deleted: ${fullPath}`);
      
          let dir = path.dirname(fullPath);
          while (dir !== path.dirname(dir)) {
            try {
              await fs.rmdir(dir);
              console.log(`Deleted directory: ${dir}`);
              dir = path.dirname(dir);
            } catch (error) {
              if (error.code === 'ENOTEMPTY' || error.code === 'ENOENT') break;
              throw error;
            }
          }
        } catch (error) {
          console.error(`Error when deleting a temporary file or directories: ${error}`);
        }
      }
    },
  }
}