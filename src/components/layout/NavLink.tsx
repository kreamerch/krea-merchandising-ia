'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import clsx from 'clsx'

type NavLinkProps = {
  href: string
  children: React.ReactNode
  onClick?: () => void
}

export default function NavLink({ href, children, onClick }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href || pathname.startsWith(`${href}/`)

  return (
    <Link
      href={href}
      onClick={onClick}
      className={clsx(
        'relative inline-flex items-center justify-center px-2 py-1 text-sm font-medium transition-colors duration-300',
        isActive ? 'text-primary' : 'text-foreground/80 hover:text-primary'
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      <span className="relative z-10">{children}</span>

      {isActive && (
        <motion.span
          layoutId="nav-indicator"
          className="absolute left-1/2 bottom-0 h-[2px] w-2/3 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_4px_var(--color-primary)]"
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30,
          }}
        />
      )}
    </Link>
  )
}
