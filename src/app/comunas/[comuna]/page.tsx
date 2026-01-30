import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowLeft, ArrowRight, MapPin, Star, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import { fetchComunas, fetchComuna } from '@/lib/queries';
import { urlForImage } from '@/lib/sanity';

interface Props {
    params: Promise<{ comuna: string }>;
}

// Generar rutas estáticas para todas las comunas
export async function generateStaticParams() {
    const comunas = await fetchComunas();
    return comunas.map((comuna) => ({
        comuna: comuna.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { comuna } = await params;
    const data = await fetchComuna(comuna);

    if (!data) return { title: 'Destino no encontrado' };

    return {
        title: `${data.name} - ${data.subtitle} | Isavan`,
        description: `Reserva tu transfer privado ahora en ${data.name}. Tarifa: ${data.price}.`,
    };
}

export default async function TrasladoPage({ params }: Props) {
    const { comuna } = await params;
    const data = await fetchComuna(comuna);

    if (!data) {
        notFound();
    }

    // Get all communes for interlinking
    const allComunas = await fetchComunas();

    // Get random other destinations (excluding current)
    const otherCommunes = allComunas
        .filter(c => c.slug !== comuna)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

    // Generate image URLs with fallback (checking both bgImage and portada)
    const activeImage = data.portada || data.bgImage;
    const portadaUrl = activeImage
        ? urlForImage(activeImage).width(1920).height(1080).url()
        : 'https://images.unsplash.com/photo-1564757523957-61c775276b53?q=80&w=1920&auto=format&fit=crop';

    return (
        <main className="w-full min-h-screen bg-zinc-950 text-white scroll-smooth">
            <NavBar />

            {/* SECCIÓN 1: HERO */}
            <section className="min-h-screen w-full relative flex items-center justify-center overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src={portadaUrl}
                        alt={data.name}
                        fill
                        unoptimized
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/70" />
                </div>

                {/* Content */}
                <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center">
                    <div className="mb-6 inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-xs font-bold tracking-widest uppercase text-green-400">
                        <Star size={12} className="mr-2 fill-green-400" />
                        Servicio Exclusivo V Región
                    </div>

                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-4 leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">
                        {data.name}
                    </h1>

                    <p className="text-xl md:text-3xl text-gray-300 mb-8 font-light max-w-3xl mx-auto leading-relaxed">
                        {data.subtitle}
                    </p>

                    <div className="text-4xl md:text-5xl font-bold text-white mb-12 flex items-baseline gap-2">
                        <span className="text-lg font-normal text-gray-400">Tarifa desde</span>
                        {data.price}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md">
                        <a
                            href="#contacto"
                            className="flex-1 px-8 py-4 rounded-full border border-white/30 bg-white/5 backdrop-blur-sm text-white font-bold tracking-wide hover:bg-white hover:text-black transition-all duration-300 text-center"
                        >
                            COTIZAR AHORA
                        </a>
                        <a
                            href={`https://wa.me/56984513302?text=Hola,%20quisiera%20cotizar%20un%20traslado%20desde%20${data.name}`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex-1 px-8 py-4 rounded-full bg-green-600 text-white font-bold tracking-wide hover:bg-green-500 transition-all duration-300 text-center shadow-lg shadow-green-900/30"
                        >
                            WHATSAPP
                        </a>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-gray-500">
                    <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center pt-2">
                        <div className="w-1 h-2 bg-gray-500 rounded-full"></div>
                    </div>
                </div>
            </section>


            {/* SECCIÓN 3: SECCIONES PERSONALIZADAS (SANITY) */}
            {data.sections && data.sections.length > 0 && (
                <section className="w-full bg-zinc-950 py-20">
                    <div className="container mx-auto px-6">
                        <div className="space-y-32">
                            {data.sections.map((section, index) => (
                                <div
                                    key={index}
                                    className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-20`}
                                >
                                    {/* Imagen */}
                                    <div className="w-full lg:w-1/2">
                                        <div className="relative aspect-[3/4] md:h-[700px] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-green-500/5 group">
                                            <Image
                                                src={urlForImage(section.image).width(900).height(1200).url()}
                                                alt={section.title}
                                                fill
                                                unoptimized
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                        </div>
                                    </div>

                                    {/* Texto */}
                                    <div className="w-full lg:w-1/2 text-left">
                                        <h3 className="text-3xl lg:text-5xl font-bold mb-6 text-white leading-tight">
                                            {section.title}
                                        </h3>
                                        <p className="text-lg lg:text-xl text-gray-400 leading-relaxed">
                                            {section.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* SECCIÓN 4: INTERLINKING */}
            <section className="w-full bg-zinc-950 p-6 md:p-12 relative border-t border-zinc-900 py-32 md:py-48">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <span className="text-green-500 font-bold tracking-widest uppercase text-sm mb-2 block">Explora la Región</span>
                        <h2 className="text-4xl md:text-6xl font-bold text-white">OTROS DESTINOS</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {otherCommunes.map((commune) => {
                            const communeImageUrl = commune.portada
                                ? urlForImage(commune.portada).width(800).height(600).url()
                                : 'https://images.unsplash.com/photo-1564757523957-61c775276b53?q=80&w=800&auto=format&fit=crop';

                            return (
                                <Link
                                    key={commune.slug}
                                    href={`/comunas/${commune.slug}`}
                                    className="group relative h-80 rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-zinc-600 transition-all duration-500"
                                >
                                    <Image
                                        src={communeImageUrl}
                                        alt={commune.name}
                                        fill
                                        unoptimized
                                        className="object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-500 group-hover:scale-105 transform"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                                    <div className="absolute bottom-0 left-0 w-full p-8">
                                        <p className="text-green-400 text-xs font-bold uppercase tracking-wider mb-2">Desde {commune.price}</p>
                                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:translate-x-2 transition-transform duration-300">
                                            {commune.name.replace('TRANSFER ', '').replace('RADIO TAXI ', '')}
                                        </h3>
                                        <div className="flex items-center text-gray-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                            Ver detalles <ArrowRight size={14} className="ml-2" />
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    <div className="mt-20 text-center">
                        <Link
                            href="/"
                            className="inline-flex items-center text-gray-500 hover:text-white transition-colors text-sm font-medium tracking-wide"
                        >
                            <ArrowLeft size={16} className="mr-2" /> VOLVER AL INICIO
                        </Link>
                    </div>
                </div>
            </section>

            {/* SECCIÓN 5: CTA & FOOTER */}
            <section className="w-full bg-zinc-950">
                {/* CTA Final */}
                <div className="py-40 md:py-64 flex items-center justify-center border-t border-zinc-900">
                    <div className="text-center px-6 max-w-5xl">
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-12 leading-tight tracking-tighter">
                            ¿Listo para tu viaje desde <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
                                {data.name.replace('TRANSFER ', '').replace('RADIO TAXI ', '')}
                            </span>?
                        </h2>
                        <Link
                            href="#contacto"
                            className="inline-block px-12 py-5 rounded-full bg-green-600 text-white font-bold text-xl hover:bg-green-500 transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-green-900/40"
                        >
                            RESERVAR AHORA
                        </Link>
                    </div>
                </div>
                <Footer />
            </section>

        </main>
    );
}
