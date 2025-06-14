// src/components/layout/Footer.tsx

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-[--color-border] text-sm text-[--color-muted] bg-[--color-background]">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
          <div>
            <h4 className="font-semibold text-[--color-foreground] mb-2">Krea Merchandising</h4>
            <p>Soluciones en artículos publicitarios</p>
          </div>
          <div>
            <h4 className="font-semibold text-[--color-foreground] mb-2">Contacto</h4>
            <p>Lima, Perú</p>
            <p>+51 915 071 839</p>
          </div>
          <div>
            <h4 className="font-semibold text-[--color-foreground] mb-2">Enlaces</h4>
            <ul className="space-y-1">
              <li><a href="/productos" className="hover:underline">Catálogo</a></li>
              <li><a href="/servicios" className="hover:underline">Servicios</a></li>
              <li><a href="/contacto" className="hover:underline">Contacto</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center text-xs mt-8 text-[--color-muted]">
          &copy; {new Date().getFullYear()} Krea Merchandising. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}
