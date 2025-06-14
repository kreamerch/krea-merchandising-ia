// src/components/ui/Textarea.tsx
import { TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export default function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        'w-full rounded-xl border border-[--color-border] bg-[--color-background] p-3 text-sm text-[--color-foreground] placeholder-[--color-muted] shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-primary]',
        className
      )}
      {...props}
    />
  )
}