'use client'

import { useEffect, useRef, useState } from 'react'
import { Search } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useDebounce } from 'use-debounce'

import { useSearchStore } from '@/store/searchStore'
import { shallow } from 'zustand/shallow'
import { useProductSearch } from '@/hooks/useProductSearch'

export default function ProductSearch() {
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // ✅ ✅ ✅ Esta forma evita errores de tipado y funciona con shallow correctamente
  const search = useSearchStore((state) => state.search)
  const setSearch = useSearchStore((state) => state.setSearch)

  const [showDropdown, setShowDropdown] = useState(false)
  const [debouncedSearch] = useDebounce(search, 300)
  const { productos = [], isLoading } = useProductSearch(debouncedSearch)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false)
      }
    }

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowDropdown(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKey)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKey)
    }
  }, [])

  return (
    <div className="relative w-full max-w-md mx-auto" ref={containerRef}>
      <label htmlFor="search" className="sr-only">
        Buscar productos
      </label>

      <Search
        className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground"
        aria-hidden="true"
      />

      <input
        ref={inputRef}
        id="search"
        type="text"
        placeholder="Buscar productos..."
        autoComplete="off"
        value={search}
        onFocus={() => setShowDropdown(true)}
        onChange={(e) => {
          setSearch(e.target.value)
          setShowDropdown(true)
        }}
        className="w-full pl-10 pr-4 py-2 border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-primary"
      />

      <AnimatePresence>
        {debouncedSearch.length > 1 && showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 mt-2 w-full rounded-2xl border border-border bg-background shadow-xl p-3"
          >
            {isLoading ? (
              <div className="p-4 text-sm text-muted-foreground">Buscando...</div>
            ) : productos.length > 0 ? (
              <ul className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {productos.map((p) => (
                  <li key={p._id}>
                    <Link
                      href={`/productos/${p.slug}`}
                      className="group relative flex items-start gap-3 px-2 py-2 rounded-lg hover:bg-muted/40 transition-colors"
                      onClick={() => setShowDropdown(false)}
                    >
                      <div className="relative w-12 h-12 rounded-md overflow-hidden border border-border bg-white">
                        <Image
                          src={p.imagen || '/placeholder.png'}
                          alt={p.title}
                          fill
                          className="object-contain p-1"
                          sizes="48px"
                        />
                      </div>
                      <div className="flex-1 text-sm pr-6">
                        <p className="font-semibold text-foreground leading-tight">
                          {p.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {p.categoria?.title ?? 'Sin categoría'}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-4 text-sm text-muted-foreground">Sin resultados</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
