"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function WeddingFleet() {
    return (
        <section className="py-24 bg-[#0B132B]">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Nuestra Flota: La Solución Perfecta
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Vehículos diseñados para el confort y la versatilidad en cualquier entorno.
                    </p>
                </div>

                {/* Item 1 */}
                <div className="flex flex-col md:flex-row items-center gap-12 mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex-1 w-full"
                    >
                        <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-[#D4AF37]/5">
                            <Image
                                src="/images/wedding-van.png"
                                alt="Peugeot Traveller VIP Isavan Weddings"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#0B132B] to-transparent z-10 opacity-40" />
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex-1"
                    >
                        <h3 className="text-2xl font-bold text-[#D4AF37] mb-4">Peugeot Traveller VIP</h3>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                            Nuestra joya de la corona. Con capacidad para hasta 7 pasajeros en configuración VIP,
                            ofrece un espacio interior inigualable. Ideal para la novia y su cortejo,
                            o para invitados VIP que buscan el máximo confort.
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-center text-gray-400">
                                <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mr-3" />
                                Acceso a portones estrechos y centros de eventos rurales.
                            </li>
                            <li className="flex items-center text-gray-400">
                                <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mr-3" />
                                Puertas laterales eléctricas para un descenso elegante.
                            </li>
                            <li className="flex items-center text-gray-400">
                                <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mr-3" />
                                Climatización independiente para cada fila.
                            </li>
                        </ul>
                    </motion.div>
                </div>

                {/* Item 2 */}
                <div className="flex flex-col md:flex-row-reverse items-center gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex-1 w-full"
                    >
                        <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-[#D4AF37]/5">
                            <Image
                                src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop"
                                alt="Interior de Lujo Isavan"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tl from-[#0B132B] to-transparent z-10 opacity-40" />
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex-1"
                    >
                        <h3 className="text-2xl font-bold text-[#D4AF37] mb-4">Interior de Primera Clase</h3>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                            No es solo un traslado, es una extensión de la fiesta. Asientos de cuero,
                            iluminación ambiental y un sistema de sonido premium para que el viaje
                            sea parte de la experiencia inolvidable.
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-center text-gray-400">
                                <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mr-3" />
                                Espacio para vestidos de novia voluminosos.
                            </li>
                            <li className="flex items-center text-gray-400">
                                <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mr-3" />
                                Cargadores USB en todas las plazas.
                            </li>
                            <li className="flex items-center text-gray-400">
                                <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mr-3" />
                                Privacidad total con vidrios tinteados de fábrica.
                            </li>
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
