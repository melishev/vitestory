import fs from 'node:fs/promises'
import path from 'node:path'

import type { Node } from '@babel/types'
import { compileScript, parse, SFCScriptBlock, walk } from 'vue/compiler-sfc'

async function storyScriptParser(pathToStory: string) {
  // vue file parsing
  const sfcRaw = await fs.readFile(pathToStory, 'utf-8')
  const parsed = parse(sfcRaw)

  // script block analysis
  return compileScript(parsed.descriptor, {
    id: '',
  })
}

/** Identifies dependency files within a story */
export async function storyImportsExtractor(
  pathToStory: string,
  scriptBlock?: SFCScriptBlock,
): Promise<Record<string, string>> {
  if (!scriptBlock) {
    scriptBlock = await storyScriptParser(pathToStory)
  }

  const result: Record<string, string> = {}

  if (!scriptBlock.imports) return result

  for (const [key, value] of Object.entries(scriptBlock.imports)) {
    if (value.isType) continue
    if (!value.isUsedInTemplate) continue
    if (!value.source.startsWith('.')) continue

    const pathToSource = path.join(pathToStory, '..', value.source)
    result[key] = pathToSource
  }

  return result
}

/** Pulls data from defineExpose */
export async function storyMetaDataExtractor(pathToStory: string) {
  const result = {}

  const scriptBlock = await storyScriptParser(pathToStory)
  const ast = scriptBlock.scriptSetupAst || scriptBlock.scriptAst
  const imports = await storyImportsExtractor(pathToStory, scriptBlock)

  walk(ast, {
    enter(node: Node) {
      if (node.type !== 'CallExpression') return
      if (node.callee.loc?.identifierName !== 'defineExpose') return

      node.arguments.forEach((arg) => {
        if (arg.type !== 'ObjectExpression') return
        arg.properties.forEach((prop) => {
          if (!prop.key && !prop.value) return

          result[prop.key.name] = prop.value.value

          if (prop.key.name === 'components' && prop.value.type === 'ArrayExpression') {
            result.components = prop.value.elements.reduce((acc, element) => {
              acc[element.name] = imports[element.name]

              return acc
            }, {})
          }
        })
      })
    },
  })

  return result
}
