// src/components/ui/Select.tsx
import { SelectHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {}

export default function Select({ className, children, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        'w-full rounded-xl border border-[--color-border] bg-[--color-background] p-3 text-sm text-[--color-foreground] shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-primary]',
        className
      )}
      {...props}
    >
      {children}
    </select>
  )
}
