import React, { FC } from 'react'
import { useTimeoutFn } from 'react-use'

import './toast.styles.scss'

type ToastProps = {
  children: React.ReactNode
  close: () => void
  hasClose?: boolean
  duration?: number
}

const Toast: FC<ToastProps> = ({
  children,
  close,
  hasClose = false,
  duration = 2000
}) => {
  useTimeoutFn(close, duration)

  return (
    <div className="toast">
      <div className="toast__text">{children}</div>
      {hasClose && (
        <button onClick={close} className="toast__close-btn">
          x
        </button>
      )}
    </div>
  )
}

export default Toast
