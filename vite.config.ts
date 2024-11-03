import path from 'node:path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue(),
    dts({ tsconfigPath: './tsconfig.app.json' })
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
