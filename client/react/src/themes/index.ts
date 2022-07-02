import { THEME } from '@/utils/enums'

export const setTheme = (theme: THEME) => {
  document.documentElement.setAttribute('data-theme', theme)
}
