import { resolve as _resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const resolve = (...dirs) => _resolve(__dirname, ...dirs)

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "sass-bem-next/_bem.scss";
          @import "/src/themes/common/var.scss";
        `
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve('./src')
    }
  },
  plugins: [vue()]
})
