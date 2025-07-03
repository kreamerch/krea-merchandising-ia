import type { Rule } from 'sanity'

const producto = {
  name: 'producto',
  title: 'Producto',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Nombre del producto',
      type: 'string',
      validation: (Rule: Rule) => Rule.required().min(3).max(100),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'precio',
      title: 'Precio (S/)',
      type: 'number',
      validation: (Rule: Rule) =>
        Rule.required().min(0).precision(2),
    },
    {
      name: 'color',
      title: 'Color principal',
      type: 'string',
      validation: (Rule: Rule) => Rule.max(50),
    },
    {
      name: 'descripcion',
      title: 'Descripción del producto',
      type: 'text',
      rows: 4,
      validation: (Rule: Rule) => Rule.max(500),
    },
    {
      name: 'imagen',
      title: 'Imágenes del producto',
      type: 'array',
      of: [{ type: 'image' }],
      options: {
        layout: 'grid',
      },
      validation: (Rule: Rule) =>
        Rule.required().min(1).warning('Agrega al menos una imagen'),
    },
    {
      name: 'categoria',
      title: 'Categoría principal',
      type: 'reference',
      to: [{ type: 'categoria' }],
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'subcategoria',
      title: 'Subcategoría',
      type: 'reference',
      to: [{ type: 'subcategoria' }],
    },
    {
      name: 'destacado',
      title: '¿Producto destacado?',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'etiqueta',
      title: 'Etiqueta visual',
      type: 'string',
      options: {
        list: [
          { title: 'Nuevo', value: 'nuevo' },
          { title: 'Oferta', value: 'oferta' },
        ],
        layout: 'dropdown',
      },
    },
    {
      name: 'meta_titulo',
      title: 'Meta título SEO',
      type: 'string',
      validation: (Rule: Rule) =>
        Rule.max(60).warning('Ideal ≤ 60 caracteres'),
    },
    {
      name: 'meta_descripcion',
      title: 'Meta descripción SEO',
      type: 'text',
      rows: 2,
      validation: (Rule: Rule) =>
        Rule.max(160).warning('Ideal ≤ 160 caracteres'),
    },
  ],

  preview: {
    select: {
      title: 'title',
      media: 'imagen.0',
      categoria: 'categoria.title',
    },
    prepare({ title, media, categoria }: any) {
      return {
        title,
        media,
        subtitle: categoria ? `Categoría: ${categoria}` : '',
      }
    },
  },
}

export default producto
