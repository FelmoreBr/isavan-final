import React from "react";
import { WobbleCard } from "../ui/wobble-card";
import Image from "next/image";

export default function ServicesSection() {
    return (
        <section className="bg-zinc-950 py-24 px-4 md:px-8 w-full relative z-20">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-black text-center text-white mb-16">
                    Soluciones de <span className="text-green-500">Transporte</span>
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">

                    {/* --- PAR 1: MATRIMONIOS --- */}
                    {/* Grande */}
                    <WobbleCard containerClassName="col-span-1 lg:col-span-2 h-full min-h-[300px] relative">
                        <Image
                            src="/images/matri-big.jpg"
                            fill
                            alt="Matrimonio"
                            className="object-cover absolute inset-0 z-0"
                            sizes="(max-width: 768px) 100vw, 66vw"
                            priority
                            unoptimized
                        />
                        <div className="absolute inset-0 bg-black/40 z-10" />
                        <div className="max-w-md relative z-20">
                            <h2 className="text-left text-2xl lg:text-3xl font-semibold text-white">
                                Transporte para tu Matrimonio
                            </h2>
                            <p className="mt-4 text-left text-base text-neutral-200">
                                Logística coordinada para que tus invitados lleguen a la ceremonia y disfruten la fiesta sin preocupaciones.
                            </p>
                        </div>
                    </WobbleCard>

                    {/* Chico */}
                    <WobbleCard containerClassName="col-span-1 min-h-[300px] relative">
                        <Image
                            src="/images/matri-small.jpg"
                            fill
                            alt="Retorno Seguro"
                            className="object-cover absolute inset-0 z-0"
                            sizes="(max-width: 768px) 100vw, 33vw"
                            unoptimized
                        />
                        <div className="absolute inset-0 bg-black/40 z-10" />
                        <div className="relative z-20">
                            <h2 className="text-left text-xl font-semibold text-white">
                                Rondas de Retorno
                            </h2>
                            <p className="mt-4 text-left text-base text-neutral-200">
                                Horarios programados para volver a casa. Nadie conduce, todos celebran seguros.
                            </p>
                        </div>
                    </WobbleCard>


                    {/* --- PAR 2: LIMACHE FC --- */}
                    {/* Chico */}
                    <WobbleCard containerClassName="col-span-1 min-h-[300px] relative">
                        <Image
                            src="/images/limache-small.jpg"
                            fill
                            alt="Ruta Santiago"
                            className="object-cover absolute inset-0 z-0"
                            sizes="(max-width: 768px) 100vw, 33vw"
                            unoptimized
                        />
                        <div className="absolute inset-0 bg-black/40 z-10" />
                        <div className="relative z-20">
                            <h2 className="text-left text-xl font-semibold text-white">
                                Ruta a Santiago
                            </h2>
                            <p className="mt-4 text-left text-base text-neutral-200">
                                Viajes exclusivos para partidos de visita. Ida y vuelta coordinada para la hinchada.
                            </p>
                        </div>
                    </WobbleCard>

                    {/* Grande */}
                    <WobbleCard containerClassName="col-span-1 lg:col-span-2 min-h-[300px] relative">
                        <Image
                            src="/images/limache-big.jpg"
                            fill
                            alt="Limache FC"
                            className="object-cover absolute inset-0 z-0"
                            sizes="(max-width: 768px) 100vw, 66vw"
                            unoptimized
                        />
                        <div className="absolute inset-0 bg-black/40 z-10" />
                        <div className="max-w-md relative z-20">
                            <h2 className="text-left text-2xl lg:text-3xl font-semibold text-white">
                                Partidos en Quillota ⚽
                            </h2>
                            <p className="mt-4 text-left text-base text-neutral-200">
                                Transporte oficial para los partidos de local. Vive la previa y llega al estadio con tu grupo.
                            </p>
                        </div>
                    </WobbleCard>


                    {/* --- PAR 3: TURISMO --- */}
                    {/* Grande */}
                    <WobbleCard containerClassName="col-span-1 lg:col-span-2 min-h-[300px] relative">
                        <Image
                            src="/images/sur-big.jpg"
                            fill
                            alt="Sur de Chile"
                            className="object-cover absolute inset-0 z-0"
                            sizes="(max-width: 768px) 100vw, 66vw"
                            unoptimized
                        />
                        <div className="absolute inset-0 bg-black/40 z-10" />
                        <div className="max-w-md relative z-20">
                            <h2 className="text-left text-2xl lg:text-3xl font-semibold text-white">
                                Giras al Sur de Chile
                            </h2>
                            <p className="mt-4 text-left text-base text-neutral-200">
                                Viajes especiales a Pucón, Valdivia o Puerto Varas. Conductores profesionales expertos en carretera.
                            </p>
                        </div>
                    </WobbleCard>

                    {/* Chico */}
                    <WobbleCard containerClassName="col-span-1 min-h-[300px] relative">
                        <Image
                            src="/images/turismo-local.jpg"
                            fill
                            alt="Turismo Local"
                            className="object-cover absolute inset-0 z-0"
                            sizes="(max-width: 768px) 100vw, 33vw"
                            unoptimized
                        />
                        <div className="absolute inset-0 bg-black/40 z-10" />
                        <div className="relative z-20">
                            <h2 className="text-left text-xl font-semibold text-white">
                                Turismo Local
                            </h2>
                            <p className="mt-4 text-left text-base text-neutral-200">
                                Recorridos por Viña, Valparaíso y alrededores. Conoce tu región con nosotros.
                            </p>
                        </div>
                    </WobbleCard>


                    {/* --- PAR 4: EMPRESAS --- */}
                    {/* Chico */}
                    <WobbleCard containerClassName="col-span-1 min-h-[300px] relative">
                        <Image
                            src="/images/empresas-small.jpg"
                            fill
                            alt="Facturación"
                            className="object-cover absolute inset-0 z-0"
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-black/40 z-10" />
                        <div className="relative z-20">
                            <h2 className="text-left text-xl font-semibold text-white">
                                Transporte Empresarial Confiable
                            </h2>
                            <p className="mt-4 text-left text-base text-neutral-200">
                                Garantiza la puntualidad y seguridad de tus colaboradores. Servicio dedicado y atención prioritaria 24/7.
                            </p>
                        </div>
                    </WobbleCard>

                    {/* Grande */}
                    <WobbleCard containerClassName="col-span-1 lg:col-span-2 min-h-[300px] relative">
                        <Image
                            src="/images/empresas-big.jpg"
                            fill
                            alt="Empresas"
                            className="object-cover absolute inset-0 z-0"
                            sizes="(max-width: 768px) 100vw, 66vw"
                        />
                        <div className="absolute inset-0 bg-black/40 z-10" />
                        <div className="max-w-md relative z-20">
                            <h2 className="text-left text-2xl lg:text-3xl font-semibold text-white">
                                Transporte de Personal
                            </h2>
                            <p className="mt-4 text-left text-base text-neutral-200">
                                Puntualidad para tu equipo de trabajo. Vehículos limpios y servicio responsable para empresas.
                            </p>
                        </div>
                    </WobbleCard>


                    {/* --- PAR 5: EVENTOS --- */}
                    {/* Grande */}
                    <WobbleCard containerClassName="col-span-1 lg:col-span-2 min-h-[300px] relative">
                        <Image
                            src="/images/fiesta-big.jpg"
                            fill
                            alt="Fiesta"
                            className="object-cover absolute inset-0 z-0"
                            sizes="(max-width: 768px) 100vw, 66vw"
                        />
                        <div className="absolute inset-0 bg-black/40 z-10" />
                        <div className="max-w-md relative z-20">
                            <h2 className="text-left text-2xl lg:text-3xl font-semibold text-white">
                                Salidas Nocturnas y Pubs
                            </h2>
                            <p className="mt-4 text-left text-base text-neutral-200">
                                El trayecto es parte de la salida. Olvídate de buscar estacionamiento o caminar de noche.
                            </p>
                        </div>
                    </WobbleCard>

                    {/* Chico */}
                    <WobbleCard containerClassName="col-span-1 min-h-[300px] relative">
                        <Image
                            src="/images/fiesta-small.jpg"
                            fill
                            alt="Licencia"
                            className="object-cover absolute inset-0 z-0"
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-black/40 z-10" />
                        <div className="relative z-20">
                            <h2 className="text-left text-xl font-semibold text-white">
                                Cuida tu Licencia
                            </h2>
                            <p className="mt-4 text-left text-base text-neutral-200">
                                Si vas a beber, nosotros manejamos. Servicio puerta a puerta real para que llegues seguro a tu cama.
                            </p>
                        </div>
                    </WobbleCard>

                </div>
            </div>
        </section>
    );
}
