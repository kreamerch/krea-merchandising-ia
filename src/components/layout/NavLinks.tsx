'use client'

import NavLink from './NavLink'

export function NavLinks({ onClick }: { onClick?: () => void }) {
  return (
    <>
      <NavLink href="/nosotros" onClick={onClick}>
        Nosotros
      </NavLink>
      <NavLink href="/productos" onClick={onClick}>
        Catálogo
      </NavLink>
      <NavLink href="/servicios" onClick={onClick}>
        Servicios
      </NavLink>
      <NavLink href="/contacto" onClick={onClick}>
        Contacto
      </NavLink>
    </>
  )
}
