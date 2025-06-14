// src/components/ui/Input.tsx
import { cn } from '@/lib/utils'
import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        'w-full rounded-xl border border-[--color-border] bg-[--color-background] text-[--color-foreground] px-4 py-2 placeholder-[--color-muted] focus:outline-none focus:ring-2 focus:ring-[--color-primary]',
        className
      )}
      {...props}
    />
  )
}