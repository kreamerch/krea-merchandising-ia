export type Categoria = {
  title: string
  slug: string
  subcategorias: Subcategoria[] // ❗️ ya no es opcional
}

export type Subcategoria = {
  title: string
  slug: string
}
