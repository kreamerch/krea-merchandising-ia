// ✅ SidebarDrawer.tsx corregido: scroll único y sin categoría duplicada
'use client'

import { Dialog } from '@headlessui/react'
import { X } from 'lucide-react'
import { motion } from 'framer-motion'
import { useDrawerState } from '@/hooks/useDrawerState'
import CategorySidebar from './CategorySidebar'

export default function SidebarDrawer() {
  const { isOpen, setIsOpen } = useDrawerState()

  return (
    <>
      {/* Botón visible solo en mobile */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden inline-flex items-center gap-2 text-sm font-medium text-white bg-primary px-4 py-2 rounded-md shadow hover:bg-primary/90 transition"
      >
        Filtrar por categoría
      </button>

      {/* Dialog Off-canvas */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50 lg:hidden">
        {/* Fondo oscuro que cierra al hacer clic */}
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />

        {/* Panel lateral */}
        <Dialog.Panel className="fixed inset-y-0 left-0 max-w-xs w-full bg-background shadow-lg flex flex-col">
          {/* Header del drawer */}
          <div className="flex justify-between items-center p-4 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">Categorías</h2>
            <motion.button
              onClick={() => setIsOpen(false)}
              aria-label="Cerrar filtro"
              className="p-2 text-muted-foreground hover:text-foreground"
              whileTap={{ scale: 0.9, rotate: -90 }}
              whileHover={{ scale: 1.1 }}
            >
              <X className="w-5 h-5 transition-transform" />
            </motion.button>
          </div>

          {/* Solo se renderiza 1 vez la categoría */}
          <div className="flex-1 overflow-hidden">
            <CategorySidebar />
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  )
}
