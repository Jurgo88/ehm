import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import typescript from '@rollup/plugin-typescript'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools(), typescript()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
