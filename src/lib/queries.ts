import { client } from './sanityClient'

export async function getProductosDestacados() {
  const query = `
    *[_type == "producto" && destacado == true]{
      _id,
      title,
      slug,
      precio,
      color,
      "imagen": imagen[0].asset->url,
      categoria->{title, slug}
    }
  `
  return await client.fetch(query)
}
