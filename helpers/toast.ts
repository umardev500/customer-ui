import { CSSProperties } from 'react'
import toast, { ValueOrFunction } from 'react-hot-toast'

type Renderable = JSX.Element | string | null
type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
interface ToastOptions {
    id?: string
    icon?: Renderable
    duration?: number
    ariaProps?: {
        role: 'status' | 'alert'
        'aria-live': 'assertive' | 'off' | 'polite'
    }
    className?: string
    style?: CSSProperties
    position?: ToastPosition
    iconTheme?: {
        primary: string
        secondary: string
    }
}

interface msgs {
    loading: Renderable
    success: ValueOrFunction<Renderable, any>
    error: ValueOrFunction<Renderable, TypeError>
}

const obj = {
    loading: (message: Renderable, options?: ToastOptions) => {
        toast.loading(message, options)
    },
    success: (message: Renderable, options?: ToastOptions) => {
        toast.success(message, options)
    },
    promise: async (handler: Promise<void>, msgs: msgs, options?: ToastOptions) => {
        try {
            await toast.promise(handler, msgs, options)
        } catch (err) {
            return await Promise.reject(err)
        }
    },
    error: (message: Renderable, options?: ToastOptions) => {
        toast.error(message, options)
    },
}

export const notify = Object.assign((message: Renderable, options?: ToastOptions) => {
    toast(message, options)
}, obj)
