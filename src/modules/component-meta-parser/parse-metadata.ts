import type setupChecker from './setup-checker'

export default function(checker: ReturnType<typeof setupChecker>, pathToComponent: string) {
  try {
    const meta = checker.getComponentMeta(pathToComponent);
    return meta;
  } catch (error) {
    throw new Error(`Error in ${pathToComponent}: ${error}`);
  }
}
