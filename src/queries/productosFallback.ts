export const productosFallbackQuery = `
  *[_type == "producto"] | order(_createdAt desc)[0...8] {
    _id,
    title,
    "slug": slug.current,
    precio,
    "imagen": imagen[0].asset->url,
    etiqueta,
    categoria->{
      title,
      "slug": slug.current
    }
  }
`
