'use client'

import { useEffect } from 'react'

export function JsonLdWebsite() {
  useEffect(() => {
    const scriptId = 'jsonld-website'
    if (document.getElementById(scriptId)) return

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.kreamerch.com'

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Krea Merchandising',
      url: baseUrl,
      logo: `${baseUrl}/logo.png`, // Asegúrate que exista en /public/logo.png
      sameAs: [
        'https://www.facebook.com/kreamerch',
        'https://www.instagram.com/kreamerch',
        'https://www.tiktok.com/@kreamerch',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+51 999 999 999', // Reemplaza con tu número real
        contactType: 'sales',
        areaServed: 'PE',
        availableLanguage: ['Spanish'],
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
  }, [])

  return null
}
