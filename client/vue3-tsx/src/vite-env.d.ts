/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

import { IIconProps } from '@icon-park/vue-next/lib/runtime'
declare module '@icon-park/vue-next/lib/runtime' {
  export interface IIconProps {
    onClick?: (event: Event, ...args: unknown[]) => any
  }
}