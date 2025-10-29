import { ref } from 'vue'

interface ToastState {
  show: boolean
  message: string
  color: string
  timeout: number
}

const toastState = ref<ToastState>({
  show: false,
  message: '',
  color: 'success',
  timeout: 3000
})

export function useToast() {
  const showToast = (message: string, color: 'success' | 'error' | 'info' | 'warning' = 'success', timeout = 3000) => {
    toastState.value = {
      show: true,
      message,
      color,
      timeout
    }
  }

  const hideToast = () => {
    toastState.value.show = false
  }

  const success = (message: string) => showToast(message, 'success')
  const error = (message: string) => showToast(message, 'error')
  const info = (message: string) => showToast(message, 'info')
  const warning = (message: string) => showToast(message, 'warning')

  return {
    toastState,
    showToast,
    hideToast,
    success,
    error,
    info,
    warning
  }
}
