import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config({ path: '.env.local' });

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2024-01-01',
    token: process.env.SANITY_TOKEN,
    useCdn: false,
});

// Datos de las comunas existentes
const COMUNAS_DATA = [
    {
        name: "TRANSFER VIÑA DEL MAR",
        slug: "vina-del-mar",
        subtitle: "Olvídate del estrés de manejar por la Ruta 68.",
        price: "$120.000",
        description: "Cubrimos desde el Sector Oriente y Reñaca hasta el Sheraton Miramar. Ideal para ejecutivos y turistas que valoran su tiempo.",
        bgImageUrl: "https://images.unsplash.com/photo-1564757523957-61c775276b53?q=80&w=1920&auto=format&fit=crop",
        orden: 1
    },
    {
        name: "TRANSFER CONCÓN",
        slug: "concon",
        subtitle: "De la refinería o la picada, directo al Aeropuerto.",
        price: "$130.000",
        description: "Especialistas en traslados desde Higuerillas, Bosques de Montemar y zona ENAP. Puntualidad para tu turno o tus vacaciones.",
        bgImageUrl: "https://images.unsplash.com/photo-1622306354802-9856f6f96605?q=80&w=1920&auto=format&fit=crop",
        orden: 2
    },
    {
        name: "TRANSFER QUILPUÉ",
        slug: "quilpue",
        subtitle: "Desde la Ciudad del Sol al Aeropuerto sin escalas.",
        price: "$110.000",
        description: "Cobertura total en El Belloto, Los Pinos y Centro. Deja tu auto seguro en casa y viaja cómodo en nuestras Vans.",
        bgImageUrl: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?q=80&w=1920&auto=format&fit=crop",
        orden: 3
    },
    {
        name: "TRANSFER VILLA ALEMANA",
        slug: "villa-alemana",
        subtitle: "Especialistas en turnos mineros y viajes al norte.",
        price: "$110.000",
        description: "Sabemos que tu turno no espera. Salidas puntuales desde Peñablanca y sector Norte. Seguridad para tus rotativas laborales.",
        bgImageUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1920&auto=format&fit=crop",
        orden: 4
    },
    {
        name: "TRANSFER LIMACHE",
        slug: "limache",
        subtitle: "Conexión directa Limache - Aeropuerto SCL.",
        price: "$120.000",
        description: "Evita el transbordo del Metro Tren. Te buscamos en Limache Viejo o San Francisco. Ideal para conectar con el agro y negocios.",
        bgImageUrl: "https://images.unsplash.com/photo-1447230436979-5098ce112d7c?q=80&w=1920&auto=format&fit=crop",
        orden: 5
    },
    {
        name: "TRANSFER OLMUÉ",
        slug: "olmue",
        subtitle: "Mantén el relax del resort hasta llegar al avión.",
        price: "$130.000",
        description: "Desde el Paradero 10 hasta el Patagual. Terminamos tus vacaciones o el Festival con un viaje seguro y cómodo.",
        bgImageUrl: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=1920&auto=format&fit=crop",
        orden: 6
    },
    {
        name: "RADIO TAXI QUILLOTA",
        slug: "quillota",
        subtitle: "Del corazón agrícola a Santiago en servicio privado.",
        price: "$130.000",
        description: "Eficiencia para productores y familias. Cobertura en San Pedro, La Palma y Centro. Tu conexión directa con la capital.",
        bgImageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1920&auto=format&fit=crop",
        orden: 7
    },
    {
        name: "TRANSFER LA CRUZ",
        slug: "la-cruz",
        subtitle: "Tranquilidad rural asegurada hasta el aeropuerto.",
        price: "$130.000",
        description: "Te recogemos en tu parcela o condominio en Pocochay o Av. 21 de Mayo. Viaje exclusivo para ti y tu equipaje.",
        bgImageUrl: "https://images.unsplash.com/photo-1500076656116-558758c991c1?q=80&w=1920&auto=format&fit=crop",
        orden: 8
    }
];

async function uploadImageFromUrl(imageUrl) {
    try {
        const response = await fetch(imageUrl);
        const buffer = await response.arrayBuffer();
        const asset = await client.assets.upload('image', Buffer.from(buffer), {
            filename: imageUrl.split('/').pop().split('?')[0] + '.jpg',
        });
        return asset;
    } catch (error) {
        console.error('Error uploading image:', error);
        return null;
    }
}

async function importComunas() {
    console.log('🚀 Iniciando importación de comunas...\n');

    for (const comuna of COMUNAS_DATA) {
        try {
            console.log(`📍 Procesando: ${comuna.name}`);

            // Subir imagen de fondo
            console.log('  ⬆️  Subiendo imagen de fondo...');
            const bgImageAsset = await uploadImageFromUrl(comuna.bgImageUrl);

            if (!bgImageAsset) {
                console.log(`  ⚠️  No se pudo subir la imagen para ${comuna.name}, continuando sin imagen...`);
            }

            // Crear documento de comuna
            const comunaDoc = {
                _type: 'comuna',
                name: comuna.name,
                slug: {
                    _type: 'slug',
                    current: comuna.slug,
                },
                price: comuna.price,
                subtitle: comuna.subtitle,
                description: comuna.description,
                orden: comuna.orden,
                ...(bgImageAsset && {
                    bgImage: {
                        _type: 'image',
                        asset: {
                            _type: 'reference',
                            _ref: bgImageAsset._id,
                        },
                    },
                }),
            };

            // Usar createOrReplace para idempotencia
            await client.createOrReplace({
                ...comunaDoc,
                _id: `comuna-${comuna.slug}`,
            });

            console.log(`  ✅ ${comuna.name} importada exitosamente\n`);
        } catch (error) {
            console.error(`  ❌ Error importando ${comuna.name}:`, error);
        }
    }

    console.log('🎉 Importación completada!');
}

// Ejecutar importación
importComunas().catch(console.error);
