'use client'

import { Mail, Phone, SunMoon } from 'lucide-react'
import { useState } from 'react'

export default function Topbar() {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark')
    setDarkMode(!darkMode)
  }

  return (
    <div className="w-full bg-muted text-foreground text-sm py-2 px-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <Mail className="w-4 h-4" />
          <span>contacto@kreamerch.com</span>
        </div>
        <div className="hidden sm:flex items-center gap-1">
          <Phone className="w-4 h-4" />
          <span>+51 915 071 839</span>
        </div>
      </div>

      <button
        onClick={toggleDarkMode}
        aria-label="Cambiar modo oscuro"
        className="ml-4 text-sm hover:text-primary transition-colors"
      >
        <SunMoon className="w-4 h-4" />
      </button>
    </div>
  )
}
