'use client'

import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'outline' | 'ghost' | 'primary' // ✅ ampliado
  size?: 'sm' | 'md' | 'lg'
}

const variants = {
  default: 'bg-primary text-white hover:bg-primary/90',
  outline: 'border border-border text-foreground hover:bg-accent',
  ghost: 'hover:bg-accent text-foreground',
  primary: 'bg-primary text-white hover:bg-primary/90', // ✅ nuevo estilo
}

const sizes = {
  sm: 'px-3 py-1 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, children, variant = 'default', size = 'md', ...props },
    ref
  ) => {
    const base =
      'inline-flex items-center justify-center rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
