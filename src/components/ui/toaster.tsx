import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/toast'

interface ToasterProps {
  toasts: Array<{
    id: string
    title: string
    description?: string
    variant?: 'default' | 'destructive' | 'success'
  }>
  dismiss: (id: string) => void
}

export function Toaster({ toasts, dismiss }: ToasterProps) {
  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, variant }) => (
        <Toast key={id} variant={variant} onOpenChange={open => !open && dismiss(id)}>
          <div className="grid gap-1">
            <ToastTitle>{title}</ToastTitle>
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  )
}
