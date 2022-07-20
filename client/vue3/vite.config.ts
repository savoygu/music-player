import { resolve as _resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

const resolve = (...dirs) => _resolve(__dirname, ...dirs)

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    base: env.NODE_ENV === 'production' ? '/music-player/' : '/',
    build: {
      outDir: 'build'
    },
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
  }
})
