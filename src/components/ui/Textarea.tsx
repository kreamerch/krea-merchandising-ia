'use client'

import { cn } from '@/lib/utils'
import { TextareaHTMLAttributes, forwardRef } from 'react'

const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          'w-full rounded-xl border border-border bg-white/90 dark:bg-muted/50 px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors duration-200 focus:border-primary focus:ring-2 focus:ring-primary/30 focus:ring-offset-1 resize-none',
          className
        )}
        {...props}
      />
    )
  }
)

Textarea.displayName = 'Textarea'
export default Textarea
