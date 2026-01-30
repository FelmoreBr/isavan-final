'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check } from 'lucide-react';

const FleetSection = () => {
    return (
        <section className="flex flex-col lg:flex-row w-full min-h-screen lg:h-screen">

            {/* LADO IZQUIERDO - Peugeot Traveller Van */}
            <div className="group relative w-full lg:w-1/2 h-[80vh] lg:h-screen flex items-center justify-center overflow-hidden transition-all duration-500 lg:hover:w-[55%] bg-zinc-900">
                {/* Imagen de Fondo */}
                <Image
                    src="/images/vant.png"
                    alt="Peugeot Traveller Van"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                    unoptimized
                    sizes="(max-width: 1024px) 100vw, 50vw"
                />

                {/* Overlay Oscuro */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-500" />

                {/* Contenido */}
                <div className="relative z-10 text-center text-white px-6 max-w-lg">
                    {/* Título */}
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-3 tracking-tight">
                        Peugeot Traveller
                    </h2>

                    {/* Subtítulo */}
                    <p className="text-xl md:text-2xl text-green-400 font-light mb-8">
                        Tu Viaje, Tus Reglas
                    </p>

                    {/* Lista de Beneficios */}
                    <ul className="space-y-3 mb-10 text-left inline-block">
                        <li className="flex items-center gap-3 text-lg">
                            <div className="p-1.5 bg-green-500/20 rounded-full">
                                <Check className="w-5 h-5 text-green-400" strokeWidth={3} />
                            </div>
                            <span className="font-medium">Servicio Privado Sin Compartir</span>
                        </li>
                        <li className="flex items-center gap-3 text-lg">
                            <div className="p-1.5 bg-green-500/20 rounded-full">
                                <Check className="w-5 h-5 text-green-400" strokeWidth={3} />
                            </div>
                            <span className="font-medium">Control Total del Trayecto</span>
                        </li>
                        <li className="flex items-center gap-3 text-lg">
                            <div className="p-1.5 bg-green-500/20 rounded-full">
                                <Check className="w-5 h-5 text-green-400" strokeWidth={3} />
                            </div>
                            <span className="font-medium">Ideal para Aeropuerto y Eventos</span>
                        </li>
                    </ul>

                    {/* Botón CTA */}
                    <Link
                        href="#contacto"
                        className="inline-block px-10 py-4 rounded-full bg-green-600 hover:bg-green-500 text-white font-bold text-lg transition-all duration-300 hover:scale-105 shadow-2xl shadow-green-900/50"
                    >
                        Reservar Van
                    </Link>
                </div>
            </div>

            {/* LADO DERECHO - Peugeot 308 Feline */}
            <div className="group relative w-full lg:w-1/2 h-[80vh] lg:h-screen flex items-center justify-center overflow-hidden transition-all duration-500 lg:hover:w-[55%] bg-zinc-900">
                {/* Imagen de Fondo - Aeropuerto */}
                <Image
                    src="/images/aeropuerto.png"
                    alt="Peugeot 308 Feline"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                    unoptimized
                    sizes="(max-width: 1024px) 100vw, 50vw"
                />

                {/* Overlay Oscuro */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-500" />

                {/* Contenido */}
                <div className="relative z-10 text-center text-white px-6 max-w-lg">
                    {/* Título */}
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-3 tracking-tight">
                        Peugeot 308 Feline
                    </h2>

                    {/* Subtítulo */}
                    <p className="text-xl md:text-2xl text-green-400 font-light mb-8">
                        Viaje Express y Seguro
                    </p>

                    {/* Lista de Beneficios */}
                    <ul className="space-y-3 mb-10 text-left inline-block">
                        <li className="flex items-center gap-3 text-lg">
                            <div className="p-1.5 bg-green-500/20 rounded-full">
                                <Check className="w-5 h-5 text-green-400" strokeWidth={3} />
                            </div>
                            <span className="font-medium">Ideal para 1-2 Pasajeros</span>
                        </li>
                        <li className="flex items-center gap-3 text-lg">
                            <div className="p-1.5 bg-green-500/20 rounded-full">
                                <Check className="w-5 h-5 text-green-400" strokeWidth={3} />
                            </div>
                            <span className="font-medium">Traslado Rápido y Directo</span>
                        </li>
                        <li className="flex items-center gap-3 text-lg">
                            <div className="p-1.5 bg-green-500/20 rounded-full">
                                <Check className="w-5 h-5 text-green-400" strokeWidth={3} />
                            </div>
                            <span className="font-medium">Máxima Seguridad ADAS</span>
                        </li>
                    </ul>

                    {/* Botón CTA */}
                    <Link
                        href="#contacto"
                        className="inline-block px-10 py-4 rounded-full bg-green-600 hover:bg-green-500 text-white font-bold text-lg transition-all duration-300 hover:scale-105 shadow-2xl shadow-green-900/50"
                    >
                        Reservar Auto
                    </Link>
                </div>
            </div>

        </section>
    );
};

export default FleetSection;
