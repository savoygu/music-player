import { createContext } from 'react'

const ToastContext = createContext({
  open: (content: string) => {}
})

export default ToastContext
