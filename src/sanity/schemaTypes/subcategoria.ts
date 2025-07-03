import { defineType } from 'sanity'

const subcategoria = defineType({
  name: 'subcategoria',
  title: 'Subcategoría',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(60),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'categorias',
      title: 'Categorías Padre',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'categoria' }] }],
      validation: (Rule) => Rule.required().min(1),
    },
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    prepare({ title, slug }) {
      return {
        title,
        subtitle: `/${slug}`,
      }
    },
  },
})

export default subcategoria
