export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-100 to-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-4">
          Merchandising personalizado para empresas
        </h1>
        <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-6">
          Promociona tu marca con artículos únicos y de calidad. Envíos a todo el Perú.
        </p>
        <a
          href="/productos"
          className="inline-block rounded-xl bg-primary text-white px-6 py-3 text-base font-semibold shadow-md transition hover:bg-orange-600"
        >
          Ver catálogo
        </a>
      </div>
    </section>
  )
}
