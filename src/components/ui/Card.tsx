// src/components/ui/Card.tsx
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

export default function Card({ children, className }: CardProps) {
  return (
    <div className={cn('bg-[--color-background] border border-[--color-border] rounded-2xl shadow-sm p-4', className)}>
      {children}
    </div>
  )
}