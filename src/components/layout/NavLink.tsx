// src/components/layout/NavLink.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface NavLinkProps {
  href: string
  label: string
}

export default function NavLink({ href, label }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={cn(
        'px-3 py-2 rounded-xl text-sm font-medium transition-colors',
        isActive ? 'bg-[--color-primary]/10 text-[--color-primary]' : 'text-[--color-foreground] hover:text-[--color-primary]'
      )}
    >
      {label}
    </Link>
  )
}