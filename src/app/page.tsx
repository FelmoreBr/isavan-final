import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import HeroSection from '@/components/HeroSection';
import ConciertosSection from '@/components/ConciertosSection';
import FleetSection from '@/components/home/FleetSection';
import ServicesSection from '@/components/home/ServicesSection';
import Footer from '@/components/Footer';
import MapSection from '@/components/MapSection';
import { client } from '@/sanity/lib/client';
import { CONCERTS_QUERY, COMMUNES_QUERY } from '@/sanity/lib/queries';

export const dynamic = 'force-dynamic';

export default async function Home() {
  // Obtener conciertos y comunas desde Sanity
  const concerts = await client.fetch(CONCERTS_QUERY);
  const comunas = await client.fetch(COMMUNES_QUERY);

  return (
    <main className="w-full min-h-screen bg-zinc-950 text-white scroll-smooth">

      {/* SLIDE 1: Hero Section (Inmersivo) */}
      <section id="inicio" className="min-h-screen w-full relative flex items-center justify-center overflow-hidden">
        {/* Fondo Inmersivo */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/bg-airport.png"
            alt="Fondo Aeropuerto"
            fill
            className="object-cover"
            priority
            unoptimized
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Contenido Hero Centrado */}
        <div className="w-full h-full flex items-center justify-center">
          <HeroSection title="TRASLADOS PRIVADOS AEROPUERTO Y EVENTOS" />
        </div>
      </section>


      {/* SLIDE 2: La Flota - Split Screen */}
      <section id="vehiculos" className="min-h-screen w-full">
        <FleetSection />
      </section>

      {/* SLIDE 3: Mapa Interactivo */}
      <MapSection />

      {/* SLIDE 4: Otros Servicios */}
      <section id="servicios" className="w-full min-h-screen flex items-center justify-center py-20">
        <ServicesSection />
      </section>

      {/* SLIDE 6: Próximos Conciertos */}
      <section id="conciertos" className="min-h-screen w-full bg-black flex flex-col justify-center items-center overflow-hidden relative">
        <div className="w-full h-full flex items-center justify-center scale-90 md:scale-100 py-20">
          <ConciertosSection concerts={concerts} />
        </div>
      </section>

      {/* SLIDE 7: Cobertura Regional con Propuesta de Valor */}
      <section id="comunas" className="w-full bg-zinc-950 relative overflow-hidden pt-32 md:pt-48 pb-40 md:pb-64">
        <div className="container mx-auto px-6 relative z-10">
          {/* Título y Comunas */}
          <div className="text-center mb-24 md:mb-32">
            <div className="inline-flex items-center justify-center p-3 bg-green-500/10 rounded-full mb-6">
              <MapPin className="text-green-500 w-8 h-8" />
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
              VIAJAMOS DESDE TODA <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">LA V REGIÓN</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              Cobertura completa en toda la región de Valparaíso.
            </p>

            <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-24 md:mb-32">
              {comunas.map((comuna: { name: string, slug: string }) => (
                <Link
                  key={comuna.slug}
                  href={`/comunas/${comuna.slug}`}
                  className="px-4 py-2 md:px-6 md:py-3 rounded-full border border-zinc-800 bg-zinc-900/50 text-gray-300 text-sm md:text-base font-medium hover:border-green-500 hover:text-green-400 transition-all"
                >
                  {comuna.name.split(':')[0].replace('TRANSFER ', '').replace('RADIO TAXI ', '')}
                </Link>
              ))}
            </div>
          </div>

          {/* Propuesta de Valor Integrada */}
          <div className="text-center mb-20 md:mb-24">
            <h3 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
              ¿Por qué elegir <span className="text-green-500">Isavan?</span>
            </h3>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Elevamos el estándar del transporte privado en la V Región.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="group flex flex-col items-center text-center p-10 rounded-[2rem] bg-gradient-to-b from-zinc-900/50 to-zinc-900/20 border border-zinc-800 hover:border-green-500/30 transition-all duration-500 hover:transform hover:-translate-y-3 shadow-xl hover:shadow-green-500/5">
              <div className="bg-green-500/10 p-6 rounded-2xl mb-8 text-green-500 group-hover:scale-110 transition-transform duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Puntualidad Garantizada</h3>
              <p className="text-gray-400 leading-relaxed text-base">
                Tu tiempo es oro. Llegamos 15 minutos antes de tu hora programada, siempre. Monitoreamos tu vuelo en tiempo real.
              </p>
            </div>
            <div className="group flex flex-col items-center text-center p-10 rounded-[2rem] bg-gradient-to-b from-zinc-900/50 to-zinc-900/20 border border-zinc-800 hover:border-green-500/30 transition-all duration-500 hover:transform hover:-translate-y-3 shadow-xl hover:shadow-green-500/5">
              <div className="bg-green-500/10 p-6 rounded-2xl mb-8 text-green-500 group-hover:scale-110 transition-transform duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" /><circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" /><path d="M5 17h2" /><path d="M15 17h2" /></svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Viaje Privado</h3>
              <p className="text-gray-400 leading-relaxed text-base">
                Sin esperas ni sorpresas. Un vehículo exclusivo para ti y tus acompañantes, con la máxima comodidad y privacidad.
              </p>
            </div>
            <div className="group flex flex-col items-center text-center p-10 rounded-[2rem] bg-gradient-to-b from-zinc-900/50 to-zinc-900/20 border border-zinc-800 hover:border-green-500/30 transition-all duration-500 hover:transform hover:-translate-y-3 shadow-xl hover:shadow-green-500/5">
              <div className="bg-green-500/10 p-6 rounded-2xl mb-8 text-green-500 group-hover:scale-110 transition-transform duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Seguridad Total</h3>
              <p className="text-gray-400 leading-relaxed text-base">
                Conductores profesionales, vehículos modernos y seguros con múltiples anclajes isofix, todos con sus mantenciones al día.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SLIDE 8: Contacto y Footer */}
      <section id="contacto" className="w-full bg-zinc-950 flex flex-col relative pt-40 md:pt-64">
        <div className="flex flex-col items-center justify-center p-6 relative z-10 mb-20 md:mb-32">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-bold mb-12 text-white tracking-tight">
              ¿Listo para <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">viajar?</span>
            </h2>

            <div className="p-8 md:p-12 rounded-[2.5rem] bg-gradient-to-br from-zinc-900 via-zinc-900/50 to-black border border-zinc-800/50 max-w-3xl mx-auto backdrop-blur-sm shadow-2xl shadow-green-500/5">
              <h3 className="text-3xl font-bold mb-6">Agenda tu traslado ahora</h3>
              <p className="text-xl text-gray-400 mb-10 max-w-xl mx-auto leading-relaxed">
                Cotiza tu traslado en segundos y asegura tu viaje con nosotros.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  href="#contacto"
                  className="px-10 py-4 rounded-2xl bg-white text-black font-bold hover:bg-gray-200 transition-all hover:scale-105 active:scale-95 text-base md:text-lg shadow-xl shadow-white/10"
                >
                  Cotizar Online
                </Link>
                <a
                  href="https://wa.me/56984513302"
                  target="_blank"
                  rel="noreferrer"
                  className="px-10 py-4 rounded-2xl bg-green-600 text-white font-bold hover:bg-green-500 transition-all hover:scale-105 active:scale-95 text-base md:text-lg shadow-xl shadow-green-600/20 flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /><path d="M8 12h.01" /><path d="M12 12h.01" /><path d="M16 12h.01" /></svg>
                  Hablar por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer integrado al final de la slide */}
        <div className="w-full mt-auto">
          <Footer />
        </div>
      </section>


    </main>
  );
}