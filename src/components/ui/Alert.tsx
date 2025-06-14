// src/components/ui/Alert.tsx
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface AlertProps {
  children: ReactNode
  className?: string
}

export default function Alert({ children, className }: AlertProps) {
  return (
    <div className={cn('bg-[--color-accent]/10 text-[--color-secondary] border-l-4 border-[--color-accent] p-4 rounded-lg', className)}>
      {children}
    </div>
  )
}