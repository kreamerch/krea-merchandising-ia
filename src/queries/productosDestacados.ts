import groq from 'groq'

export const productosDestacadosQuery = groq`
  *[_type == "producto" && destacado == true] | order(_createdAt desc)[0...8] {
    _id,
    title,
    "slug": slug.current,
    precio,
    color,
    "imagen": imagen[0].asset->url,
    destacado,
    etiqueta, // ✅ ESTE CAMPO FALTABA
    categoria->{
      title,
      "slug": slug.current
    }
  }
`
