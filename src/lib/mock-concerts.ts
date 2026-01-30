export interface Concert {
    slug: string;
    artist: string;
    date: string;
    venue: string;
    theme: 'rock' | 'pop' | 'party' | 'classic';
    tourName: string;
    seoKeyword: string;
    description: string;
}

export const CONCERTS: Concert[] = [
    // --- DICIEMBRE (URGENCIA) ---
    {
        slug: 'santiago-rocks-2025-loserville',
        artist: 'Limp Bizkit & Loserville',
        date: '2025-12-13T20:00:00',
        venue: 'Estadio Nacional',
        theme: 'rock',
        tourName: 'LOSERVILLE TOUR 2025',
        seoKeyword: 'traslado limp bizkit estadio nacional',
        description: 'El festival de Nu Metal más grande del año. Limp Bizkit trae su show caótico junto a Bones y N8NOFACE. No te quedes botado en Ñuñoa.',
    },
    {
        slug: 'purple-disco-machine-caupolican',
        artist: 'Purple Disco Machine',
        date: '2025-12-13T23:00:00',
        venue: 'Teatro Caupolicán',
        theme: 'party',
        tourName: 'PARADISE TOUR',
        seoKeyword: 'transfer fiesta purple disco machine',
        description: 'El rey del Nu-Disco enciende la pista del Caupolicán. Olvídate de manejar después de bailar toda la noche. Vuelta segura a la V Región.',
    },
    {
        slug: 'cristian-castro-movistar',
        artist: 'Cristian Castro',
        date: '2025-12-20T21:00:00',
        venue: 'Movistar Arena',
        theme: 'classic',
        tourName: 'HITS TOUR',
        seoKeyword: 'radio taxi cristian castro movistar',
        description: 'Una noche de clásicos románticos. Servicio puerta a puerta para que disfrutes "Azul" y "Lloran las Rosas" con total comodidad.',
    },

    // --- ENERO (ALTA DEMANDA) ---
    {
        slug: 'bad-bunny-estadio-nacional',
        artist: 'Bad Bunny',
        date: '2026-01-09T20:00:00',
        venue: 'Estadio Nacional',
        theme: 'pop',
        tourName: 'LA NUEVA ERA WORLD TOUR',
        seoKeyword: 'transfer bad bunny estadio nacional viña',
        description: 'El Conejo Malo regresa para hacer historia con 3 Estadios Nacionales. El evento urbano de la década. Llega con estilo y seguridad.',
    },
    {
        slug: 'crush-power-music-2026',
        artist: 'Crush Power Music',
        date: '2026-01-24T16:00:00',
        venue: 'Parque Padre Hurtado',
        theme: 'pop',
        tourName: 'FESTIVAL DE VERANO',
        seoKeyword: 'van crush power music 2026',
        description: 'El festival del verano con Kidd Voodoo y Cris MJ. Ideal para grupos de amigos. Te llevamos y traemos al Parque Padre Hurtado.',
    },
    {
        slug: 'my-chemical-romance-chile',
        artist: 'My Chemical Romance',
        date: '2026-01-28T21:00:00',
        venue: 'Estadio Nacional',
        theme: 'rock',
        tourName: 'LONG LIVE THE BLACK PARADE',
        seoKeyword: 'traslado my chemical romance chile',
        description: 'El regreso emo más esperado. MCR revive "The Black Parade". No desperdicies lágrimas buscando Uber, reserva tu van privada.',
    },
    {
        slug: 'la-renga-chile-2026',
        artist: 'La Renga',
        date: '2026-01-31T20:00:00',
        venue: 'Movistar Arena',
        theme: 'rock',
        tourName: 'TOTALMENTE POSEÍDOS',
        seoKeyword: 'bus la renga movistar arena',
        description: 'El banquete se toma Santiago. La Renga vuelve con su rock de estadio. Viaje directo para los mismos de siempre.',
    },
    {
        slug: 'i-love-reggaeton-2026',
        artist: 'I Love Reggaeton Festival',
        date: '2026-01-17T18:00:00',
        venue: 'Movistar Arena',
        theme: 'party',
        tourName: 'PERREOLANDIA',
        seoKeyword: 'traslado perreolandia movistar arena',
        description: 'Maldy, Yandel y los clásicos del género en una sola noche. Perrea hasta el suelo, nosotros te llevamos a casa seguro.',
    },
];
