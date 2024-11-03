import path from "node:path";
import fs from 'node:fs/promises'
import type { Plugin } from "vite";

export interface PluginOptions {
  /** The directory where the files will be generated to */
  distDir: string
}

export default function(options: PluginOptions): Plugin {
  const getFullPath = (fileName: string) => path.resolve(process.cwd(), options.distDir, fileName)

  const dataFiles = [
    { fileName: `[slug].md`, content: `content`.trim() }, 
    { fileName: `[slug].paths.js`, content: `
export default {
  paths() {
    return [
      { params: { slug: 'foo' }},
      { params: { slug: 'bar' }}
    ]
  }
}
      ` },
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