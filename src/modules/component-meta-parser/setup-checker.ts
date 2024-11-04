import { createChecker, type MetaCheckerOptions } from 'vue-component-meta'

export default function (pathToTSConfig: string): ReturnType<typeof createChecker> {
  const schemaExceptions = ['Width<string | number>', 'Height<string | number>']
  const checkerOptions: MetaCheckerOptions = {
    forceUseTs: true,
    schema: {
      ignore: [(v) => schemaExceptions.some((exclusion) => v.includes(exclusion))],
    },
    rawType: false,
    noDeclarations: true,
  }
  const checker = createChecker(pathToTSConfig, checkerOptions)

  return checker
}
