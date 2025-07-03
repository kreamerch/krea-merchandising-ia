'use client'

import { useState, useEffect } from 'react'
import { Mail, Phone, SunMoon, Facebook, Instagram } from 'lucide-react'
import TikTokIcon from '@/components/icons/TikTokIcon'

export default function Topbar() {
  const [darkMode, setDarkMode] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)

  // Establecer tema inicial una vez montado
  useEffect(() => {
    const isDark = localStorage.getItem('theme') === 'dark'
    setDarkMode(isDark)
    setHasMounted(true)
    document.documentElement.classList.toggle('dark', isDark)
  }, [])

  // Aplicar cambio de tema
  useEffect(() => {
    if (!hasMounted) return
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('theme', darkMode ? 'dark' : 'light')
  }, [darkMode, hasMounted])

  const toggleDarkMode = () => setDarkMode((prev) => !prev)

  return (
    <div
      className="w-full text-xs sm:text-sm text-foreground/90 
        bg-gradient-to-r from-[rgba(0,200,255,0.06)] via-[rgba(255,165,0,0.06)] to-[rgba(0,255,200,0.06)] 
        animate-gradient backdrop-blur-xl border-b border-border 
        shadow-[inset_0_1px_2px_rgba(0,0,0,0.08),0_2px_10px_rgba(0,0,0,0.05)] 
        dark:shadow-[inset_0_1px_2px_rgba(255,255,255,0.04),0_2px_8px_rgba(255,255,255,0.03)] 
        transition-all duration-700 z-50"
    >
      <div className="container mx-auto px-4 py-1.5 flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-0">
        {/* Escritorio: Email + Teléfono */}
        <div className="hidden sm:flex items-center gap-6">
          <div className="flex items-center gap-2 opacity-85">
            <Mail className="w-[15px] h-[15px]" />
            <span>contacto@kreamerch.com</span>
          </div>
          <div className="flex items-center gap-2 opacity-85">
            <Phone className="w-[15px] h-[15px]" />
            <span>+51 955 876 887</span>
          </div>
        </div>

        {/* Móvil: Solo número, redes y modo oscuro */}
        <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-4">
          <div className="flex sm:hidden items-center gap-2 opacity-80">
            <Phone className="w-[15px] h-[15px]" />
            <span>+51 955 876 887</span>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <SocialIcon href="https://facebook.com/kreamerch" label="Facebook">
              <Facebook className="w-[17px] h-[17px]" />
            </SocialIcon>
            <SocialIcon href="https://instagram.com/kreamerch" label="Instagram">
              <Instagram className="w-[17px] h-[17px]" />
            </SocialIcon>
            <SocialIcon href="https://www.tiktok.com/@kreamerch" label="TikTok">
              <TikTokIcon className="w-[17px] h-[17px]" />
            </SocialIcon>

          
          </div>
        </div>
      </div>
    </div>
  )
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group relative flex items-center justify-center text-secondary hover:text-primary transition-all"
    >
      {children}
      <span className="absolute -inset-1 rounded-full opacity-0 scale-90 bg-primary/20 blur-sm transition-all group-hover:opacity-100 group-hover:scale-100 group-hover:animate-pulse"></span>
    </a>
  )
}
