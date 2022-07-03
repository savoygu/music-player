import React, { useState, useMemo, FC } from 'react'
import { createPortal } from 'react-dom'

import ToastContext from './toast.context'
import Toast from './toast.component'

// Create a random ID
function generateUUID(): string {
  let first: string | number = (Math.random() * 46656) | 0
  let second: string | number = (Math.random() * 46656) | 0
  first = ('000' + first.toString(36)).slice(-3)
  second = ('000' + second.toString(36)).slice(-3)
  return first + second
}

type ToastProviderProps = {
  children: React.ReactNode
}

type TToast = {
  id: string
  content: string
}

const ToastProvider: FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<TToast[]>([])

  const open = (content: string) =>
    setToasts((currentToasts) => [
      ...currentToasts,
      { id: generateUUID(), content }
    ])

  const close = (id: string) =>
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id)
    )

  const contextValue = useMemo(() => ({ open }), [])

  return (
    <ToastContext.Provider value={contextValue}>
      {children}

      {createPortal(
        <div className="toasts-wrapper">
          {toasts.map((toast) => (
            <Toast key={toast.id} close={() => close(toast.id)}>
              {toast.content}
            </Toast>
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  )
}

export default ToastProvider
