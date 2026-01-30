import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, Music, Shield, Clock, CheckCircle, ArrowRight, MessageCircle } from 'lucide-react';
import { client } from '@/sanity/lib/client';
import { CONCERTS_QUERY, CONCERT_BY_SLUG_QUERY } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';
import { THEMES, ConcertThemeKey } from '@/lib/concert-themes';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

// Generar rutas estáticas para todos los conciertos (SEO)
export async function generateStaticParams() {
    const concerts = await client.fetch(CONCERTS_QUERY);
    return concerts.map((concert: any) => ({
        slug: concert.slug,
    }));
}

// Generar metadata dinámica para SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const concert: Concert | null = await client.fetch(CONCERT_BY_SLUG_QUERY, { slug });

    // Fallback si no se encuentra el concierto
    if (!concert) {
        return {
            title: 'Concierto no encontrado | Isavan',
            description: 'Transfer privado para conciertos en la V Región de Chile.',
        };
    }

    // Construir título SEO-optimizado
    const title = concert.seoKeyword
        ? `${concert.seoKeyword} - Transfer Privado | Isavan`
        : `${concert.artist} en ${concert.venue} - Transfer Privado | Isavan`;

    // Truncar descripción a 160 caracteres para SEO
    const description = concert.description
        ? concert.description.length > 160
            ? `${concert.description.substring(0, 157)}...`
            : concert.description
        : `Transfer privado para ${concert.artist} en ${concert.venue}. Viaja seguro y sin preocupaciones con Isavan.`;

    // Generar URL de imagen para Open Graph
    const ogImage = concert.portada
        ? urlFor(concert.portada).width(1200).height(630).url()
        : concert.mainImage
            ? urlFor(concert.mainImage).width(1200).height(630).url()
            : 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&h=630&auto=format&fit=crop';

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: `${concert.artist} en ${concert.venue}`,
                },
            ],
            type: 'website',
            locale: 'es_CL',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [ogImage],
        },
    };
}

interface Concert {
    _id: string;
    artist: string;
    slug: string;
    date: string;
    venue: string;
    theme: ConcertThemeKey;
    tourName?: string;
    description?: string;
    seoKeyword?: string;
    mainImage?: any;
    portada?: any;
    articulo?: any;
}

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function ConcertPage({ params }: PageProps) {
    const { slug } = await params;
    const concert: Concert | null = await client.fetch(CONCERT_BY_SLUG_QUERY, { slug });

    if (!concert) {
        notFound();
    }

    const theme = THEMES[concert.theme];

    // Formatear fecha
    const eventDate = new Date(concert.date);
    const formattedDate = eventDate.toLocaleDateString('es-CL', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
    const formattedTime = eventDate.toLocaleTimeString('es-CL', {
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <main className={`h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth ${theme.colors.background} ${theme.colors.text}`}>
            <NavBar />

            {/* SECCIÓN 1: HERO */}
            <section className="snap-start h-screen w-full relative flex items-center justify-center overflow-hidden">
                {/* Fondo Temático */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src={
                            concert.portada
                                ? urlFor(concert.portada).width(1920).height(1080).url()
                                : concert.mainImage
                                    ? urlFor(concert.mainImage).width(1920).height(1080).url()
                                    : theme.images.placeholder
                        }
                        alt={`${concert.artist} en ${concert.venue}`}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center pt-20">
                    <span className={`inline-block px-4 py-1 rounded-full border ${theme.colors.accent} border-current mb-6 text-sm font-bold tracking-widest uppercase`}>
                        {concert.tourName}
                    </span>

                    <h1 className={`text-5xl md:text-8xl mb-6 ${theme.fonts.heading} text-white drop-shadow-lg`}>
                        {concert.artist}
                    </h1>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-lg md:text-xl mb-10 font-medium">
                        <div className="flex items-center gap-2">
                            <Calendar className={theme.colors.accent} />
                            <span>{formattedDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className={theme.colors.accent} />
                            <span>{formattedTime} hrs</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className={theme.colors.accent} />
                            <span>{concert.venue}</span>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <Link
                            href="#reservar"
                            className={`px-8 py-4 rounded-full font-bold text-lg transition-transform hover:scale-105 shadow-xl ${theme.colors.button}`}
                        >
                            Reservar Transfer
                        </Link>
                        <a
                            href={`https://wa.me/56984513302?text=Hola,%20quiero%20cotizar%20transfer%20para%20${encodeURIComponent(concert.artist)}%20en%20${encodeURIComponent(concert.venue)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-4 rounded-full font-bold text-lg border-2 border-white text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                        >
                            <MessageCircle size={20} />
                            Cotizar por WhatsApp
                        </a>
                    </div>
                </div>
            </section>

            {/* SECCIÓN 2: LA HISTORIA / BLOG */}
            <section className={`snap-start h-screen w-full flex flex-col md:flex-row overflow-hidden ${theme.colors.background}`}>
                {/* Mitad Imagen */}
                <div className="w-full md:w-1/2 h-1/2 md:h-full relative">
                    <Image
                        src={
                            concert.articulo
                                ? urlFor(concert.articulo).width(1200).height(1200).url()
                                : concert.mainImage
                                    ? urlFor(concert.mainImage).width(1200).height(1200).url()
                                    : theme.images.placeholder
                        }
                        alt="Ambiente del concierto"
                        fill
                        className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent md:bg-gradient-to-r" />
                </div>

                {/* Mitad Contenido */}
                <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center p-8 md:p-16">
                    <div className="max-w-xl">
                        <h2 className={`text-3xl md:text-5xl mb-8 ${theme.fonts.heading} ${theme.colors.accent}`}>
                            SOBRE EL TOUR
                        </h2>
                        <p className={`text-lg md:text-xl leading-relaxed mb-8 opacity-90 ${theme.fonts.body}`}>
                            {concert.description}
                        </p>

                        <div className="space-y-4">
                            <h3 className="text-xl font-bold border-b border-zinc-800 pb-2 mb-4 text-white">Datos Clave</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <Music className={`shrink-0 mt-1 ${theme.colors.accent}`} size={20} />
                                    <span className="text-zinc-300">Experiencia musical de primer nivel con sonido envolvente.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Clock className={`shrink-0 mt-1 ${theme.colors.accent}`} size={20} />
                                    <span className="text-zinc-300">Apertura de puertas estimada: 17:00 hrs.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Shield className={`shrink-0 mt-1 ${theme.colors.accent}`} size={20} />
                                    <span className="text-zinc-300">Transporte seguro ida y vuelta garantizado.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECCIÓN 3: LOGÍSTICA & CTA & FOOTER */}
            <section id="reservar" className={`snap-start h-screen w-full flex flex-col relative overflow-hidden ${theme.colors.background}`}>
                {/* Fondo sutil Isavan */}
                <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-900 via-zinc-950 to-zinc-950" />

                <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10 text-center">
                    <h2 className={`text-4xl md:text-6xl mb-12 ${theme.fonts.heading} text-white`}>
                        ASEGURA TU <span className="text-green-500">RETORNO</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
                        <div className="bg-zinc-900/50 p-8 rounded-2xl backdrop-blur-sm border border-zinc-800 hover:border-green-500/50 transition-colors group">
                            <Shield className={`w-12 h-12 mb-4 mx-auto ${theme.colors.accent} group-hover:scale-110 transition-transform`} />
                            <h3 className="text-xl font-bold mb-2 text-white">Seguridad Total</h3>
                            <p className="text-sm text-zinc-400">Conductores profesionales y vehículos monitoreados 24/7.</p>
                        </div>
                        <div className="bg-zinc-900/50 p-8 rounded-2xl backdrop-blur-sm border border-zinc-800 hover:border-green-500/50 transition-colors group">
                            <Clock className={`w-12 h-12 mb-4 mx-auto ${theme.colors.accent} group-hover:scale-110 transition-transform`} />
                            <h3 className="text-xl font-bold mb-2 text-white">Sin Esperas</h3>
                            <p className="text-sm text-zinc-400">Tu van te estará esperando apenas termine el último bis.</p>
                        </div>
                        <div className="bg-zinc-900/50 p-8 rounded-2xl backdrop-blur-sm border border-zinc-800 hover:border-green-500/50 transition-colors group">
                            <CheckCircle className={`w-12 h-12 mb-4 mx-auto ${theme.colors.accent} group-hover:scale-110 transition-transform`} />
                            <h3 className="text-xl font-bold mb-2 text-white">Comodidad VIP</h3>
                            <p className="text-sm text-zinc-400">Asientos reclinables, aire acondicionado y espacio para tus compras.</p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-6">
                        <p className="text-xl text-zinc-300 max-w-2xl mx-auto">
                            No arriesgues tu noche buscando Uber o Taxi a la salida. Reserva tu cupo ahora y viaja tranquilo.
                        </p>
                        <a
                            href={`https://wa.me/56984513302?text=Hola,%20quiero%20asegurar%20mi%20cupo%20para%20${encodeURIComponent(concert.artist)}%20en%20${encodeURIComponent(concert.venue)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center px-10 py-5 rounded-full font-bold text-xl transition-all hover:scale-105 shadow-2xl shadow-green-900/20 ${theme.colors.button}`}
                        >
                            Reservar Mi Cupo Ahora <ArrowRight className="ml-2" />
                        </a>
                    </div>
                </div>

                {/* Footer integrado */}
                <div className="w-full relative z-20">
                    <Footer />
                </div>
            </section>

        </main>
    );
}
