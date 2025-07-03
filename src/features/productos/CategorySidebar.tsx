'use client'

import { useCategoriasConSubcategorias } from '@/queries/categoriasConSubcategorias'
import { useFilterStore } from '@/store/filterStore'
import { useDrawerState } from '@/hooks/useDrawerState'
import { useEffect, useMemo, useRef, useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import clsx from 'clsx'
import CategorySidebarSkeleton from '@/components/ui/CategorySidebarSkeleton'
import { AnimatePresence, motion } from 'framer-motion'
import type { RefCallback } from 'react'

export default function CategorySidebar() {
  const { data: categorias, isLoading, isError } = useCategoriasConSubcategorias()
  const {
    categoria,
    subcategoria,
    subcategoriaCategoria,
    setCategoria,
    setSubcategoria,
    clearFiltros,
  } = useFilterStore()
  const { setIsOpen } = useDrawerState()

  const [open, setOpen] = useState<Record<string, boolean>>({})
  const categoriasMemo = useMemo(() => categorias ?? [], [categorias])
  const containerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<Record<string, HTMLLIElement | null>>({})

  useEffect(() => {
    if (categoria && categoriasMemo.length) {
      const match = categoriasMemo.find(
        (c) => c.slug === categoria && c.subcategorias?.length
      )
      if (match) {
        setOpen((prev) => ({ ...prev, [categoria]: true }))
      }
    }
  }, [categoria, categoriasMemo])

  const closeIfMobile = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setTimeout(() => setIsOpen(false), 150)
    }
  }

  const handleSelectCategoria = (slug: string | null) => {
    setCategoria(slug)
    closeIfMobile()
  }

  const handleSelectSubcategoria = (slug: string | null, catSlug: string) => {
    setSubcategoria(slug, catSlug)
    closeIfMobile()
  }

  const setItemRef = (slug: string): RefCallback<HTMLLIElement> => (el) => {
    itemRefs.current[slug] = el
  }

  const toggleCategoria = (slug: string) => {
    setOpen((prev) => {
      const newState = { ...prev, [slug]: !prev[slug] }

      if (!prev[slug] && itemRefs.current[slug] && containerRef.current) {
        const container = containerRef.current
        const item = itemRefs.current[slug]!
        const scrollPadding = 32
        const scrollTarget = item.offsetTop - scrollPadding

        const isVisible =
          scrollTarget >= container.scrollTop &&
          scrollTarget <= container.scrollTop + container.clientHeight

        if (!isVisible) {
          container.scrollTo({
            top: scrollTarget,
            behavior: 'smooth',
          })
        }
      }
      return newState
    })
  }

  if (isLoading) return <CategorySidebarSkeleton className="space-y-2" />
  if (isError || !categoriasMemo.length)
    return <p className="text-sm text-destructive px-4">Error al cargar categorías</p>

  return (
    <nav aria-label="Categorías de productos" className="flex flex-col h-dvh">
      <div className="sticky top-0 bg-background z-10 py-3 px-4 border-b border-border">
        <h2 className="text-base lg:text-lg font-semibold text-foreground">Filtrar por categoría</h2>
      </div>

      <div
        ref={containerRef}
        className="overflow-y-auto flex-1 scroll-smooth scrollbar-thin scrollbar-thumb-muted-foreground/40 hover:scrollbar-thumb-muted-foreground/60 px-4 pb-6"
      >
        <ul className="space-y-1 mt-2">
          <li>
            <button
              onClick={clearFiltros}
              aria-current={!categoria && !subcategoria ? 'page' : undefined}
              className={clsx(
                'w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors',
                !categoria && !subcategoria
                  ? 'bg-primary text-white shadow border border-primary'
                  : 'text-foreground hover:bg-muted'
              )}
            >
              Todos los productos
            </button>
          </li>

          {categoriasMemo.map((cat) => {
            const isActiveCategoria = categoria === cat.slug && !subcategoria
            const hasSubcategorias = cat.subcategorias?.length > 0
            const isExpanded = open[cat.slug]

            return (
              <li key={cat.slug} ref={setItemRef(cat.slug)} className="scroll-mt-20">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handleSelectCategoria(cat.slug)}
                    aria-current={isActiveCategoria ? 'page' : undefined}
                    className={clsx(
                      'flex-1 text-left px-3 py-2 rounded-md transition-colors text-sm font-medium',
                      isActiveCategoria
                        ? 'bg-primary text-white shadow border border-primary'
                        : 'text-foreground hover:bg-muted'
                    )}
                  >
                    {cat.title}
                  </button>

                  {hasSubcategorias && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleCategoria(cat.slug)
                      }}
                      aria-label={`Mostrar subcategorías de ${cat.title}`}
                      aria-expanded={isExpanded}
                      className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  )}
                </div>

                <AnimatePresence initial={false}>
                  {isExpanded && hasSubcategorias && (
                    <motion.ul
                      key={`subcat-${cat.slug}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="ml-4 mt-1 space-y-1 border-l border-border pl-3 overflow-hidden"
                      role="group"
                      aria-label={`Subcategorías de ${cat.title}`}
                    >
                      {cat.subcategorias.map((sub) => {
                        const isActiveSub =
                          subcategoria === sub.slug &&
                          subcategoriaCategoria === cat.slug

                        return (
                          <li key={`${cat.slug}-${sub.slug}`}>
                            <button
                              onClick={() => handleSelectSubcategoria(sub.slug, cat.slug)}
                              aria-current={isActiveSub ? 'page' : undefined}
                              className={clsx(
                                'w-full text-left text-sm px-3 py-1.5 rounded-md transition-colors',
                                isActiveSub
                                  ? 'bg-accent text-accent-foreground font-semibold'
                                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                              )}
                            >
                              {sub.title}
                            </button>
                          </li>
                        )
                      })}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
