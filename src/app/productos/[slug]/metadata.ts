import type { Metadata } from 'next'
import { productoPorSlugQuery } from '@/queries/productos'
import { sanityClient } from '@/lib/sanity/client'

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const producto = await sanityClient.fetch(productoPorSlugQuery, {
    slug: params.slug,
  })

  if (!producto) {
    return {
      title: 'Producto no encontrado | Krea Merch',
      description: 'Este producto no está disponible o ha sido eliminado.',
      robots: 'noindex',
    }
  }

  const title = `${producto.meta_titulo || producto.title} | Krea Merch`
  const description =
    producto.meta_descripcion ||
    `Cotiza el producto "${producto.title}" desde S/ ${producto.precio.toFixed(2)}. Personalízalo con tu logo o mensaje.`

  const canonicalUrl = `https://kreamerch.com/productos/${producto.slug}`
  const image =
    producto.imagenes?.[0] || producto.imagen || 'https://kreamerch.com/placeholder.webp'

  return {
    title,
    description,
    metadataBase: new URL('https://kreamerch.com'),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'website',
      siteName: 'Krea Merch',
      images: [
        {
          url: image,
          alt: `Imagen del producto: ${producto.title}`,
          width: 800,
          height: 800,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: '/favicon.ico',
    },
  }
}
