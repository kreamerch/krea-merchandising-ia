'use client'

import { useEffect, useState } from 'react'

/**
 * 🧩 Hook personalizado para controlar el estado del Drawer (con persistencia)
 * - Persiste en localStorage el estado abierto/cerrado
 * - Seguro en SSR (evita acceso directo en servidor)
 * @param key Clave única en localStorage (por defecto: 'drawer-abierto')
 */
export function useDrawerState(key = 'drawer-abierto') {
  const [isOpen, setIsOpen] = useState(false)

  // 🔄 Inicializa desde localStorage (solo en cliente)
  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      const stored = localStorage.getItem(key)
      if (stored !== null) {
        setIsOpen(JSON.parse(stored))
      }
    } catch {
      // fallback seguro
      setIsOpen(false)
    }
  }, [key])

  // 💾 Guarda cambios en localStorage al cambiar isOpen
  useEffect(() => {
    if (typeof window === 'undefined') return
    localStorage.setItem(key, JSON.stringify(isOpen))
  }, [isOpen, key])

  return { isOpen, setIsOpen }
}
