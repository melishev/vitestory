import { fileURLToPath } from 'node:url'

import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import tailwind from 'tailwindcss'
import { defineConfig } from 'vite'

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
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
