'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { THEMES } from '@/lib/concert-themes';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { urlFor } from '@/sanity/lib/image';

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

interface ConciertosProps {
  concerts: Concert[];
}

const ConciertosSection = ({ concerts }: ConciertosProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Autoplay effect
  useEffect(() => {
    if (!isAutoPlaying || !concerts || concerts.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === concerts.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Cambia cada 4 segundos

    return () => clearInterval(interval);
  }, [isAutoPlaying, concerts]);

  // Si no hay conciertos, mostrar mensaje
  if (!concerts || concerts.length === 0) {
    return (
      <section className="h-full w-full bg-gray-900 text-white relative overflow-hidden flex flex-col justify-center py-16">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/Concierto.png"
            alt="Concierto background"
            fill
            className="object-cover opacity-100"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
            Próximos <span className="text-green-500">Eventos</span>
          </h2>
          <p className="text-xl text-gray-400">
            Pronto anunciaremos nuevos eventos. ¡Mantente atento!
          </p>
        </div>
      </section>
    );
  }

  const nextSlide = () => {
    setIsAutoPlaying(false); // Pausa autoplay al interactuar
    setCurrentIndex((prevIndex) =>
      prevIndex === concerts.length - 1 ? 0 : prevIndex + 1
    );
    // Reactiva autoplay después de 10 segundos
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false); // Pausa autoplay al interactuar
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? concerts.length - 1 : prevIndex - 1
    );
    // Reactiva autoplay después de 10 segundos
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false); // Pausa autoplay al interactuar
    setCurrentIndex(index);
    // Reactiva autoplay después de 10 segundos
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className="h-full w-full bg-gray-900 text-white relative overflow-hidden flex flex-col justify-center py-16">
      {/* Imagen de fondo del aeropuerto */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/Concierto.png"
          alt="Concierto background"
          fill
          className="object-cover opacity-100"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 tracking-tight">
          Próximos <span className="text-green-500">Eventos</span>
        </h2>

        <div className="relative max-w-5xl mx-auto">
          {/* Carrusel principal */}
          <div className="relative h-[500px] md:h-[600px] overflow-visible" style={{ perspective: '1000px' }}>
            {concerts.map((concierto, index) => {
              const theme = THEMES[concierto.theme];
              const eventDate = new Date(concierto.date);
              const formattedDate = eventDate.toLocaleDateString('es-CL', {
                day: 'numeric',
                month: 'long'
              });

              // Generar URL de imagen de Sanity o usar placeholder
              const imageUrl = concierto.portada
                ? urlFor(concierto.portada).width(800).height(800).url()
                : concierto.mainImage
                  ? urlFor(concierto.mainImage).width(800).height(800).url()
                  : theme.images.placeholder;

              return (
                <div
                  key={concierto._id}
                  className={`absolute inset-0 transition-all duration-700 ease-in-out flex items-center justify-center`}
                  style={{
                    transform: index === currentIndex
                      ? 'rotateY(0deg) scale(1) translateX(0)'
                      : index < currentIndex
                        ? 'rotateY(-45deg) scale(0.8) translateX(-50%)'
                        : 'rotateY(45deg) scale(0.8) translateX(50%)',
                    opacity: index === currentIndex ? 1 : 0.3,
                    zIndex: index === currentIndex ? 20 : 10,
                    pointerEvents: index === currentIndex ? 'auto' : 'none',
                  }}
                >
                  <div className="relative w-full max-w-md h-full max-h-[550px] bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                    {/* Imagen del Evento */}
                    <div className="relative h-3/5 w-full overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt={concierto.artist}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent`} />

                      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                        <span className={`text-xs font-bold uppercase tracking-wider ${theme.colors.accent}`}>
                          {concierto.theme}
                        </span>
                      </div>
                    </div>

                    {/* Información */}
                    <div className="absolute bottom-0 left-0 right-0 h-2/5 p-6 flex flex-col justify-between bg-zinc-900">
                      <div>
                        <h3 className={`text-2xl font-bold mb-2 line-clamp-1 ${theme.colors.text}`}>
                          {concierto.artist}
                        </h3>
                        <p className="text-sm text-gray-400 mb-4 line-clamp-1">
                          {concierto.tourName || 'Tour 2025'}
                        </p>

                        <div className="space-y-2 text-sm text-gray-300">
                          <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-green-500" />
                            <span>{formattedDate}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin size={16} className="text-green-500" />
                            <span>{concierto.venue}</span>
                          </div>
                        </div>
                      </div>

                      <Link
                        href={`/transfer-concierto/${concierto.slug}`}
                        className={`w-full mt-4 py-3 rounded-xl font-bold text-center transition-all flex items-center justify-center gap-2 ${theme.colors.button}`}
                      >
                        Ver Detalles <ArrowRight size={18} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Botones de navegación */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-zinc-800/80 hover:bg-green-600 text-white p-3 rounded-full transition-colors duration-200 backdrop-blur-sm z-30"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 md:translate-x-12 bg-zinc-800/80 hover:bg-green-600 text-white p-3 rounded-full transition-colors duration-200 backdrop-blur-sm z-30"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Indicadores */}
          <div className="flex justify-center mt-8 space-x-2">
            {concerts.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-green-500 w-8' : 'bg-gray-600 hover:bg-gray-400'
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConciertosSection;