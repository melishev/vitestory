import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'

export default defineConfig({
  plugins: [vue()],

  build: {
    outDir: 'dist/components',
    emptyOutDir: false,
    lib: {
      entry: 'src/components/index.ts',
      formats: ['es'],
      name: 'index',
      fileName: 'index',
    },
    rollupOptions: {
      external: ['vue', 'shiki', 'lucide-vue-next', 'radix-vue', '@vueuse/core'],
    },
  },

  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
