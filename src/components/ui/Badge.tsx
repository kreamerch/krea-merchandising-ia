// src/components/ui/Badge.tsx
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'primary' | 'secondary'
  className?: string
}

export default function Badge({ children, variant = 'primary', className }: BadgeProps) {
  const variants = {
    primary: 'bg-[--color-primary] text-[--color-background]',
    secondary: 'bg-[--color-muted] text-[--color-foreground]',
  }

  return (
    <span className={cn('inline-block text-xs font-semibold px-3 py-1 rounded-full', variants[variant], className)}>
      {children}
    </span>
  )
}