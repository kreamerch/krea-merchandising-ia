'use client'

import { cn } from '@/lib/utils'
import { InputHTMLAttributes, forwardRef } from 'react'

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'w-full rounded-xl border border-border bg-white/90 dark:bg-muted/50 px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors duration-200 focus:border-primary focus:ring-2 focus:ring-primary/30 focus:ring-offset-1',
          className
        )}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'
export default Input
