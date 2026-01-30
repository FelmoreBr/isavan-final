#!/usr/bin/env node

/**
 * Script de Seeding para Conciertos en Sanity CMS
 * 
 * Uso:
 * SANITY_TOKEN=tu_token_aqui node scripts/import-concerts.mjs
 * 
 * El token debe tener permisos de escritura en el dataset de producción.
 * Puedes generarlo en: https://sanity.io/manage
 */

import { createClient } from 'next-sanity';

// Configuración del cliente de Sanity
const client = createClient({
    projectId: "qykf1ky7",
    dataset: 'production',
    apiVersion: '2024-01-01',
    token: "skj0LzXzBr5JHL7zkLbB4e1mRQUBf4tz7eEitaB7qhTMsHHGVlBjPyae1ksOgPTjSUZVYhm5WWSgHzoQNxxOwi7JAgmSrIBf2yIuBa7sss7p9Ik36ty4O6QsrBwKG4ss82na6yJw0f26I5j7MH31TnILMkjv63SLrM4X6ITBhO2CbeY8v68p", // <--- Pégalo aquí
    useCdn: false,
});


// Data de conciertos (Dic 2025 - Mar 2026)
const concerts = [
    {
        _type: 'concert',
        _id: 'limp-bizkit-loserville',
        artist: "Limp Bizkit",
        slug: { _type: 'slug', current: "limp-bizkit-loserville" },
        date: "2025-12-13T20:00:00Z",
        venue: "Metropolitan Santiago",
        theme: "rock",
        tourName: "LOSERVILLE TOUR",
        description: "El Nu Metal se toma el Metropolitan. Asegura tu salida de este evento masivo.",
        seoKeyword: "traslado limp bizkit santiago"
    },
    {
        _type: 'concert',
        _id: 'purple-disco-machine-caupolican',
        artist: "Purple Disco Machine",
        slug: { _type: 'slug', current: "purple-disco-machine-caupolican" },
        date: "2025-12-13T23:00:00Z",
        venue: "Teatro Caupolicán",
        theme: "party",
        tourName: "PARADISE TOUR",
        description: "Fiesta post-show imperdible. El rey del disco house en el corazón de Santiago.",
        seoKeyword: "van purple disco machine caupolican"
    },
    {
        _type: 'concert',
        _id: 'bad-bunny-estadio-nacional',
        artist: "Bad Bunny",
        slug: { _type: 'slug', current: "bad-bunny-estadio-nacional" },
        date: "2026-01-09T20:00:00Z",
        venue: "Estadio Nacional",
        theme: "pop",
        tourName: "LA NUEVA ERA",
        description: "El evento urbano del año. Logística compleja de salida en el Nacional, reserva tu van con anticipación.",
        seoKeyword: "transfer bad bunny estadio nacional"
    },
    {
        _type: 'concert',
        _id: 'festival-olmue-2026',
        artist: "Festival del Huaso",
        slug: { _type: 'slug', current: "festival-olmue-2026" },
        date: "2026-01-15T22:00:00Z",
        venue: "El Patagual, Olmué",
        theme: "party",
        tourName: "FESTIVAL TELEVISADO",
        description: "La fiesta de la chilenidad. Traslados desde y hacia el interior de la V Región.",
        seoKeyword: "radio taxi festival olmue"
    },
    {
        _type: 'concert',
        _id: 'avenged-sevenfold-nacional',
        artist: "Avenged Sevenfold",
        slug: { _type: 'slug', current: "avenged-sevenfold-nacional" },
        date: "2026-01-24T20:00:00Z",
        venue: "Estadio Nacional",
        theme: "rock",
        tourName: "LIFE IS BUT A DREAM",
        description: "Regreso triunfal al estadio más importante de Chile. Metal progresivo y puesta en escena épica.",
        seoKeyword: "transfer avenged sevenfold estadio nacional"
    },
    {
        _type: 'concert',
        _id: 'mcr-bicentenario',
        artist: "My Chemical Romance",
        slug: { _type: 'slug', current: "mcr-bicentenario" },
        date: "2026-01-28T21:00:00Z",
        venue: "Estadio Bicentenario La Florida",
        theme: "rock",
        tourName: "THE BLACK PARADE",
        description: "El himno de una generación. La Florida colapsará, asegura tu retorno cómodo y seguro.",
        seoKeyword: "traslado my chemical romance la florida"
    },
    {
        _type: 'concert',
        _id: 'chayanne-movistar-2026',
        artist: "Chayanne",
        slug: { _type: 'slug', current: "chayanne-movistar-2026" },
        date: "2026-02-07T21:00:00Z",
        venue: "Movistar Arena",
        theme: "classic",
        tourName: "BAILEMOS OTRA VEZ",
        description: "El papá de Chile vuelve a casa. Servicio VIP puerta a puerta para una noche romántica perfecta.",
        seoKeyword: "transfer chayanne movistar arena"
    },
    {
        _type: 'concert',
        _id: 'acdc-estadio-nacional',
        artist: "AC/DC",
        slug: { _type: 'slug', current: "acdc-estadio-nacional" },
        date: "2026-03-11T20:00:00Z",
        venue: "Estadio Nacional",
        theme: "rock",
        tourName: "POWER UP TOUR",
        description: "El evento de rock más grande de la década. Alta demanda histórica. No te quedes sin transporte.",
        seoKeyword: "transfer acdc chile estadio nacional"
    }
];

// Función principal de importación
async function importConcerts() {
    console.log('🎸 Iniciando importación de conciertos a Sanity...\n');
    console.log(`📊 Total de conciertos a importar: ${concerts.length}\n`);

    try {
        // Crear transacción
        let transaction = client.transaction();

        // Agregar cada concierto a la transacción
        concerts.forEach((concert, index) => {
            console.log(`  ${index + 1}. ${concert.artist} - ${concert.venue}`);
            transaction = transaction.createOrReplace(concert);
        });

        // Ejecutar la transacción
        console.log('\n⏳ Ejecutando transacción...');
        const result = await transaction.commit();

        console.log('\n✅ ¡Importación completada exitosamente!');
        console.log(`📝 Documentos procesados: ${result.results.length}`);
        console.log('\n🎉 Los conciertos ya están disponibles en tu CMS de Sanity.');
        console.log('🌐 Puedes verlos en: https://sanity.io/manage\n');

    } catch (error) {
        console.error('\n❌ Error durante la importación:');
        console.error(error.message);

        if (error.statusCode === 401) {
            console.log('\n💡 El token parece ser inválido o no tiene permisos de escritura.');
            console.log('   Verifica tu token en: https://sanity.io/manage\n');
        }

        process.exit(1);
    }
}

// Ejecutar el script
importConcerts();
