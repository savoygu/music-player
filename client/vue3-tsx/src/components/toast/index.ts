import { App, createApp } from 'vue'
import Toast from './Toast'

interface ToastProps {
  text: string
  duration?: number
  appendTo?: HTMLElement
}

let timer: ReturnType<typeof setTimeout> | undefined
let toastInstance: App
let mountNode: HTMLElement

export default function createToast ({
  text,
  duration = 2000,
  appendTo = document.body
}: ToastProps) {
  const clear = () => {
    toastInstance.unmount()
    appendTo.removeChild(mountNode)
  }

  if (timer) {
    clearTimeout(timer)
    clear()
  }

  toastInstance = createApp(Toast, {
    text,
    show: true
  })

  mountNode = document.createElement('div')
  appendTo.appendChild(mountNode)
  toastInstance.mount(mountNode)

  timer = setTimeout(() => {
    clear()
    timer = undefined
  }, duration)
}
