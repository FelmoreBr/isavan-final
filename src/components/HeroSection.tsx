'use client'

import React, { useState } from 'react';
import NavBar from './NavBar';
import ComunasSection from './ComunasSection';
import CotizadorAeropuerto from './CotizadorAeropuerto';

interface HeroSectionProps {
  title?: string;
}

const HeroSection = ({ title }: HeroSectionProps) => {
  const [comunaSeleccionada, setComunaSeleccionada] = useState<string>('');
  return (
    <section className="relative min-h-screen flex flex-col">
      {/* NavBar */}
      <NavBar />

      {/* Hero Content */}
      <div className="flex-1 relative flex items-center justify-center text-white">
        {/* Contenido principal */}
        <div className="container mx-auto px-4 md:px-6 z-20 pt-32 pb-16 md:pt-48 md:pb-24">
          {/* Título centrado */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight mb-4 md:mb-6 text-shadow-lg text-balance px-2">
              {title || "Tu Viaje, Tu Experiencia, Nuestra Promesa."}
            </h1>
          </div>

          {/* Cotizador de Aeropuerto */}
          <div className="max-w-4xl mx-auto">
            <CotizadorAeropuerto comunaSeleccionada={comunaSeleccionada} />
          </div>

          {/* Carrusel de Comunas integrado */}
          <div className="mt-16">
            <ComunasSection onComunaSelect={setComunaSeleccionada} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;