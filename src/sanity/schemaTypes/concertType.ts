import { defineField, defineType } from 'sanity'

export const concertType = defineType({
    name: 'concert',
    title: 'Concert',
    type: 'document',
    fields: [
        defineField({
            name: 'artist',
            title: 'Artist',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'artist',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'date',
            title: 'Date',
            type: 'datetime',
        }),
        defineField({
            name: 'venue',
            title: 'Venue',
            type: 'string',
        }),
        defineField({
            name: 'theme',
            title: 'Theme',
            type: 'string',
            options: {
                list: [
                    { title: 'Rock', value: 'rock' },
                    { title: 'Pop', value: 'pop' },
                    { title: 'Urbano (Reggaeton/Trap)', value: 'urbano' },
                    { title: 'Party (Cumbia/Ranchera)', value: 'party' },
                    { title: 'Classic (Romántico/Adulto)', value: 'classic' },
                    { title: 'Electronic (Techno/House)', value: 'electronic' },
                    { title: 'Kids (Familiar)', value: 'kids' },
                    { title: 'Indie (Alternativo)', value: 'indie' },
                ],
            },
        }),
        defineField({
            name: 'tourName',
            title: 'Tour Name',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'seoKeyword',
            title: 'SEO Keyword',
            type: 'string',
            description: 'Palabra clave principal para SEO',
        }),
        defineField({
            name: 'mainImage',
            title: 'Main Image (Legacy)',
            type: 'image',
            description: 'Imagen principal legacy - usar portada y articulo en su lugar',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'portada',
            title: 'Imagen de Portada (Hero)',
            type: 'image',
            description: 'Fondo oscuro para la pantalla principal (1920x1080)',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'articulo',
            title: 'Imagen Editorial (Blog)',
            type: 'image',
            description: 'Foto vertical o cuadrada para la sección de historia',
            options: {
                hotspot: true,
            },
        }),
    ],
})
