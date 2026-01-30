import { defineType } from 'sanity'

export const comunaType = defineType({
  name: 'comuna',
  title: 'Comuna',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Título de la Comuna',
      type: 'string',
      description: 'Ej: TRANSFER VIÑA DEL MAR',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'price',
      title: 'Precio',
      type: 'string',
      description: 'Ej: $120.000',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'subtitle',
      title: 'Subtítulo (Gancho)',
      type: 'string',
      description: 'Frase corta que capte la atención',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'portada',
      title: 'Imagen de Portada (Hero)',
      type: 'image',
      description: 'Fondo oscuro para la pantalla principal',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'sections',
      title: 'Secciones de Contenido',
      type: 'array',
      description: 'Agrega hasta 3 secciones personalizadas con texto e imagen',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Título de la Sección', type: 'string' },
            { name: 'description', title: 'Descripción', type: 'text' },
            { name: 'image', title: 'Imagen de la Sección', type: 'image', options: { hotspot: true } },
          ]
        }
      ],
      validation: (Rule) => Rule.max(3),
    },
    {
      name: 'orden',
      title: 'Orden',
      type: 'number',
      description: 'Orden de aparición en listados',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'price',
      media: 'portada',
    },
  },
})