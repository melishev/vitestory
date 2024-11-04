import path from 'node:path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import vue from '@vitejs/plugin-vue'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  plugins: [
    vue(),
    dts({ tsconfigPath: './tsconfig.app.json', exclude: ['**/components/**'] }),
    viteStaticCopy({
      targets: [
        { src: 'src/components/**/!(*.story).*', dest: 'components' }
      ]
    })
  ],

  build: {
    ssr: true,
    lib: {
      entry: {
        index: path.resolve(__dirname, 'src/index.ts'),
        'modules/index': path.resolve(__dirname, 'src/modules/index.ts')
      },
      formats: ['es'],
      name: 'index',
      fileName: 'index',
    },
  },
})
