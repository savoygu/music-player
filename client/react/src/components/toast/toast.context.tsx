import { createContext } from 'react'

const ToastContext = createContext({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  open: (content: string) => {}
})

export default ToastContext
