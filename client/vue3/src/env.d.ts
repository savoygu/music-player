/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

// eslint-disable-next-line no-unused-vars
interface ImportMetaEnv {
  readonly VITE_APP_ACCESS_KEY: string
  readonly VITE_APP_SECRET_KEY: string
  // 更多环境变量...
}

// eslint-disable-next-line no-unused-vars
interface ImportMeta {
  readonly env: ImportMetaEnv
}
