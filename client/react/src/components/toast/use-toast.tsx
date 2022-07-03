import { useContext } from 'react'
import ToastContext from './toast.context'

const useToast = () => useContext(ToastContext)

export default useToast
