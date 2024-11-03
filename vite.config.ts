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
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'index',
      fileName: 'index',
    },
  },
})
