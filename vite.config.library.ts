import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    dts({ tsconfigPath: './tsconfig.app.json' }),
  ],

  build: {
    ssr: true,
    emptyOutDir: false,
    lib: {
      entry: {
        index: path.resolve(__dirname, 'src/index.ts'),
        'modules/index': path.resolve(__dirname, 'src/modules/index.ts'),
      },
      formats: ['es'],
      name: 'index',
      fileName: 'index',
    },
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
