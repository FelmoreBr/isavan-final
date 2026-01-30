import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin } from 'lucide-react';
import { fetchComunas } from '@/lib/queries';
import { urlForImage } from '@/lib/sanity';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

export const dynamic = 'force-dynamic';

export default async function ComunasPage() {
    const comunas = await fetchComunas();

    return (
        <main className="w-full min-h-screen bg-zinc-950 text-white">
            <NavBar />

            <section className="pt-32 pb-20 px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center p-3 bg-green-500/10 rounded-full mb-6">
                            <MapPin className="text-green-500 w-8 h-8" />
                        </div>
                        <h1 className="text-4xl md:text-7xl font-bold mb-6 tracking-tight">
                            Nuestras <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Comunas</span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Explora todos nuestros destinos en la Región de Valparaíso y reserva tu traslado privado al Aeropuerto SCL.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {comunas.map((comuna) => {
                            const activeImage = comuna.portada || comuna.bgImage;
                            const portadaUrl = activeImage
                                ? urlForImage(activeImage).width(800).height(600).url()
                                : `https://images.unsplash.com/photo-1564757523957-61c775276b53?q=80&w=800&auto=format&fit=crop`;

                            return (
                                <Link
                                    key={comuna.slug}
                                    href={`/comunas/${comuna.slug}`}
                                    className="group relative h-96 rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-green-500/50 transition-all duration-500 shadow-xl"
                                >
                                    <Image
                                        src={portadaUrl}
                                        alt={comuna.name}
                                        fill
                                        unoptimized
                                        className="object-cover opacity-50 group-hover:opacity-70 transition-all duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                                    <div className="absolute bottom-0 left-0 w-full p-8">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full border border-green-500/30">
                                                V Región
                                            </span>
                                            <span className="text-gray-400 text-xs font-medium">Desde {comuna.price}</span>
                                        </div>
                                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:translate-x-2 transition-transform duration-300">
                                            {comuna.name.replace('TRANSFER ', '').replace('RADIO TAXI ', '')}
                                        </h2>
                                        <div className="flex items-center text-green-400 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0 uppercase tracking-widest">
                                            Reservar ahora <ArrowRight size={16} className="ml-2" />
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
