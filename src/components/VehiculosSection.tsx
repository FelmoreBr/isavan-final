import React from 'react';
import Image from 'next/image';

const VehiculosSection = () => {
  return (
    <section className="py-16 bg-gray-900 text-white relative overflow-hidden">
      {/* Imagen de fondo del aeropuerto */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/aeropuerto.png"
          alt="Aeropuerto background"
          fill
          className="object-cover opacity-100"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          El Vehículo Perfecto para Cada Ocasión
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Peugeot Traveller */}
          <div className="bg-gray-800/30 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-2 text-isavan-green">
              Peugeot Traveller
            </h3>
            <p className="text-xl text-green-400 font-light mb-6">
              Tu Viaje, Tus Reglas
            </p>
            <ul className="space-y-3 text-gray-300 mb-6">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                Servicio Privado Sin Compartir
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                Control Total del Trayecto
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                Ideal para Aeropuerto y Eventos
              </li>
            </ul>
          </div>

          {/* Peugeot 308 Feline */}
          <div className="bg-gray-800/30 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-2 text-isavan-green">
              Peugeot 308 Feline
            </h3>
            <p className="text-xl text-green-400 font-light mb-6">
              Viaje Express y Seguro
            </p>
            <ul className="space-y-3 text-gray-300 mb-6">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                Ideal para 1-2 Pasajeros
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                Traslado Rápido y Directo
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                Máxima Seguridad ADAS
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VehiculosSection;