import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { THEMES } from '@/lib/concert-themes';
import { client } from '@/sanity/lib/client';
import { CONCERTS_QUERY } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Próximos Conciertos | Isavan Traslados',
  description: 'Agenda tu traslado para los mejores conciertos y festivales en Santiago. Viaja seguro y cómodo desde la V Región.',
};

interface Concert {
  _id: string;
  artist: string;
  slug: string;
  date: string;
  venue: string;
  theme: 'rock' | 'pop' | 'party' | 'classic';
  tourName?: string;
  portada?: any;
  mainImage?: any;
}

export default async function ConciertosPage() {
  // Obtener conciertos desde Sanity
  const concerts: Concert[] = await client.fetch(CONCERTS_QUERY);

  return (
    <main className="min-h-screen bg-zinc-950 text-white flex flex-col">
      <NavBar />

      {/* Header Section */}
      <section className="relative py-32 px-6 flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/Concierto.png"
            alt="Conciertos Background"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-zinc-950/60 to-zinc-950" />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
            PRÓXIMOS <span className="text-green-500">EVENTOS</span>
          </h1>
          <p className="text-xl text-zinc-300 max-w-2xl mx-auto">
            No te pierdas a tus artistas favoritos. Reserva tu transporte exclusivo ida y vuelta desde la V Región.
          </p>
        </div>
      </section>

      {/* Grid de Conciertos */}
      <section className="container mx-auto px-6 pb-24 relative z-10 flex-1">
        {concerts.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-3xl font-bold text-gray-400 mb-4">
              Próximamente nuevos eventos
            </h2>
            <p className="text-xl text-gray-500">
              Estamos trabajando en traer los mejores conciertos. ¡Vuelve pronto!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {concerts.map((concert) => {
              const theme = THEMES[concert.theme];
              const eventDate = new Date(concert.date);
              const formattedDate = eventDate.toLocaleDateString('es-CL', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              });

              // Generar URL de imagen de Sanity o usar placeholder
              const imageUrl = concert.portada
                ? urlFor(concert.portada).width(800).height(600).url()
                : concert.mainImage
                  ? urlFor(concert.mainImage).width(800).height(600).url()
                  : theme.images.placeholder;

              return (
                <Link
                  key={concert._id}
                  href={`/transfer-concierto/${concert.slug}`}
                  className="group relative bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-green-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-900/20 flex flex-col h-full"
                >
                  {/* Imagen */}
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={concert.artist}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />

                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-black/80 backdrop-blur-sm ${theme.colors.accent} border border-white/10`}>
                        {concert.theme}
                      </span>
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      <h3 className={`text-2xl font-bold mb-2 line-clamp-1 text-white group-hover:text-green-500 transition-colors`}>
                        {concert.artist}
                      </h3>
                      <p className="text-sm text-zinc-400 mb-6 font-medium tracking-wide">
                        {concert.tourName || 'Tour 2025'}
                      </p>

                      <div className="space-y-3 text-sm text-zinc-300 mb-6">
                        <div className="flex items-center gap-3">
                          <Calendar size={18} className="text-green-500" />
                          <span className="font-medium">{formattedDate}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <MapPin size={18} className="text-green-500" />
                          <span className="font-medium">{concert.venue}</span>
                        </div>
                      </div>
                    </div>

                    <div className="w-full py-3 rounded-xl font-bold text-center flex items-center justify-center gap-2 bg-zinc-800 group-hover:bg-green-600 text-white transition-colors">
                      Ver Detalles <ArrowRight size={18} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}