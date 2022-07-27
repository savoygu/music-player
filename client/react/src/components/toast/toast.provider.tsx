import React, { useState, useMemo, FC } from 'react'
import { createPortal } from 'react-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import Toast from './toast.component'
import ToastContext from './toast.context'

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
        <TransitionGroup className="toasts-wrapper">
          {toasts.map((toast) => (
            <CSSTransition key={toast.id} timeout={300} classNames="toast-item">
              <Toast close={() => close(toast.id)}>{toast.content}</Toast>
            </CSSTransition>
          ))}
        </TransitionGroup>,
        document.body
      )}
    </ToastContext.Provider>
  )
}

export default ToastProvider
