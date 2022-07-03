import React, { FC } from 'react'
import { useTimeoutFn } from 'react-use'

import './toast.styles.scss'

type ToastProps = {
  close: () => void
  children: React.ReactNode
}

const Toast: FC<ToastProps> = ({ close, children }) => {
  useTimeoutFn(close, 3000)

  return (
    <div className="toast">
      <div className="toast__text">{children}</div>
      <div>
        <button onClick={close} className="toast__close-btn">
          x
        </button>
      </div>
    </div>
  )
}

export default Toast
