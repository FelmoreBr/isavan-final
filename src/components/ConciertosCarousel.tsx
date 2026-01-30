'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules'
import Link from 'next/link'
import Image from 'next/image'
import { THEMES } from '@/lib/concert-themes'
import { Calendar, MapPin, ArrowRight } from 'lucide-react'
import { urlFor } from '@/sanity/lib/image'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

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

interface ConciertosCarouselProps {
  concerts: Concert[];
}

const ConciertosCarousel = ({ concerts }: ConciertosCarouselProps) => {
  // Si no hay conciertos, mostrar mensaje
  if (!concerts || concerts.length === 0) {
    return (
      <div className="w-full py-8 text-center">
        <p className="text-xl text-gray-400">
          Pronto anunciaremos nuevos eventos. ¡Mantente atento!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Swiper
        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        loop={concerts.length > 1}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          slideShadows: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          320: {
            slidesPerView: 1.2,
          },
          640: {
            slidesPerView: 1.5,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="conciertos-carousel !pb-12"
      >
        {concerts.map((concert) => {
          const theme = THEMES[concert.theme];
          const eventDate = new Date(concert.date);
          const formattedDate = eventDate.toLocaleDateString('es-CL', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          });

          // Definir colores de borde según el tema
          const borderColor = {
            rock: 'border-red-600',
            pop: 'border-cyan-400',
            party: 'border-yellow-400',
            classic: 'border-amber-400',
          }[concert.theme];

          const shadowColor = {
            rock: 'shadow-red-900/20',
            pop: 'shadow-cyan-900/20',
            party: 'shadow-yellow-900/20',
            classic: 'shadow-amber-900/20',
          }[concert.theme];

          // Generar URL de imagen de Sanity o usar placeholder
          const imageUrl = concert.portada
            ? urlFor(concert.portada).width(800).height(800).url()
            : concert.mainImage
              ? urlFor(concert.mainImage).width(800).height(800).url()
              : theme.images.placeholder;

          return (
            <SwiperSlide key={concert._id} className="!w-[350px] md:!w-[450px]">
              <Link href={`/transfer-concierto/${concert.slug}`}>
                <div className={`group relative bg-zinc-900 rounded-2xl overflow-hidden border-2 ${borderColor} shadow-2xl ${shadowColor} transition-transform duration-300 hover:-translate-y-2 h-[550px] flex flex-col`}>

                  {/* Badge de Tema */}
                  <div className="absolute top-4 right-4 z-20">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-black/80 backdrop-blur-sm ${theme.colors.accent} border border-white/10`}>
                      {concert.theme}
                    </span>
                  </div>

                  {/* Imagen */}
                  <div className="relative h-3/5 w-full overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={concert.artist}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
                  </div>

                  {/* Contenido */}
                  <div className="relative h-2/5 p-6 flex flex-col justify-between bg-zinc-900">
                    <div>
                      <h3 className={`text-2xl font-bold mb-1 line-clamp-1 ${theme.colors.text}`}>
                        {concert.artist}
                      </h3>
                      <p className="text-sm text-gray-400 mb-4 font-medium tracking-wide">
                        {concert.tourName || 'Tour 2025'}
                      </p>

                      <div className="space-y-2 text-sm text-gray-300">
                        <div className="flex items-center gap-3">
                          <Calendar size={16} className={theme.colors.accent} />
                          <span className="font-medium">{formattedDate}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <MapPin size={16} className={theme.colors.accent} />
                          <span className="font-medium">{concert.venue}</span>
                        </div>
                      </div>
                    </div>

                    <div className={`mt-4 w-full py-3 rounded-xl font-bold text-center flex items-center justify-center gap-2 transition-colors ${theme.colors.button}`}>
                      Reservar Transfer <ArrowRight size={18} />
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

export default ConciertosCarousel