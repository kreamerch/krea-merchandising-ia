'use client'

import { useEffect } from 'react'

type JsonLdProductProps = {
  id: string
  title: string
  slug: string
  imagen: string
  precio: number
  descripcion?: string
}

export function JsonLdProduct({
  id,
  title,
  slug,
  imagen,
  precio,
  descripcion,
}: JsonLdProductProps) {
  useEffect(() => {
    const scriptId = `jsonld-product-${id}`
    if (document.getElementById(scriptId)) return

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.kreamerch.com'
    const productUrl = `${baseUrl}/productos/${slug}`

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      '@id': productUrl,
      name: title,
      image: [imagen],
      description: descripcion?.trim() || title,
      offers: {
        '@type': 'Offer',
        priceCurrency: 'PEN',
        price: precio,
        availability: 'https://schema.org/InStock',
        url: productUrl,
      },
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = scriptId
    script.innerHTML = JSON.stringify(jsonLd)
    document.head.appendChild(script)

    return () => {
      const existing = document.getElementById(scriptId)
      if (existing) document.head.removeChild(existing)
    }
  }, [id, title, slug, imagen, precio, descripcion])

  return null
}
