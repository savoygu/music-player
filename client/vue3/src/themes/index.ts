import { Theme } from '@/types'

export const setTheme = (theme: Theme) => {
  document.documentElement.setAttribute('data-theme', theme)
}
