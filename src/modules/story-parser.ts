import fs from 'node:fs/promises'
import path from 'node:path'

import { babelParse, parse, walk } from '@vue/compiler-sfc'
import type { SFCParseResult } from 'vue/compiler-sfc'

import type { ViteStoryExposeOptions } from '../types'

async function parseSFC(pathToFile: string): Promise<SFCParseResult> {
  const sfcRaw = await fs.readFile(pathToFile, 'utf-8')
  return parse(sfcRaw)
}

function buildASTForScript(scriptContent: string) {
  const ast = babelParse(scriptContent, {
    sourceType: 'module',
    plugins: ['typescript'],
  })

  return ast
}

function getExposeData(pathToFile: string, ast: ReturnType<typeof babelParse>): ViteStoryExposeOptions {
  const data = {} as ViteStoryExposeOptions
  const componentPaths: Record<string, string> = {}

  walk(ast, {
    enter(node) {
      if (node.type === 'ImportDeclaration') {
        const importPath = node.source.value
        node.specifiers.forEach((specifier) => {
          if (specifier.type === 'ImportDefaultSpecifier' || specifier.type === 'ImportSpecifier') {
            componentPaths[specifier.local.name] = path.resolve(pathToFile, '../', importPath)
          }
        })
      }

      if (node.type === 'CallExpression' && node.callee.name === 'defineExpose') {
        node.arguments.forEach((arg) => {
          if (arg.type === 'ObjectExpression') {
            arg.properties.forEach((prop) => {
              if (prop.key && prop.value) {
                data[prop.key.name] = prop.value.value
              }

              if (prop.key && prop.key.name === 'components' && prop.value.type === 'ArrayExpression') {
                const components = new Map()

                for (const element of prop.value.elements) {
                  if (element.type !== 'Identifier') continue
                  if (!componentPaths[element.name]) continue

                  components.set(element.name, componentPaths[element.name])
                }

                data['components'] = components
              }
            })
          }
        })
      }
    },
  })

  return data
}

export default async function (pathToStory: string): Promise<ViteStoryExposeOptions | undefined> {
  const parsed = await parseSFC(pathToStory)

  if (parsed.descriptor.scriptSetup) {
    const scriptContent = parsed.descriptor.scriptSetup.content

    const ast = buildASTForScript(scriptContent)
    const exposedData = getExposeData(pathToStory, ast)

    return exposedData
  }
}
