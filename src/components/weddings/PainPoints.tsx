"use client";

import { motion } from "framer-motion";
import { SignalLow, ShieldAlert, ThermometerSnowflake } from "lucide-react";

const points = [
    {
        title: "Zona Muerta",
        description: "Muchos centros de eventos están en zonas rurales sin señal. No arriesgues a tus invitados a quedarse esperando una App que nunca llegará.",
        icon: SignalLow,
    },
    {
        title: "Rutas Peligrosas",
        description: "Caminos de tierra, curvas cerradas y poca iluminación. Nuestros conductores profesionales conocen cada ruta de la V Región.",
        icon: ShieldAlert,
    },
    {
        title: "Confort Real",
        description: "Evita el calor extremo o el frío de la noche. Nuestras Vans cuentan con climatización tri-zona y asientos ergonómicos de cuero.",
        icon: ThermometerSnowflake,
    },
];

export default function PainPoints() {
    return (
        <section className="py-24 bg-[#0B132B] relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        ¿Por qué no confiar en cualquier transporte?
                    </h2>
                    <div className="w-20 h-1 bg-[#D4AF37] mx-auto" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {points.map((point, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D4AF37]/50 transition-all group"
                        >
                            <div className="w-14 h-14 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center mb-6 group-hover:bg-[#D4AF37]/20 transition-colors">
                                <point.icon className="w-8 h-8 text-[#D4AF37]" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">{point.title}</h3>
                            <p className="text-gray-400 leading-relaxed">
                                {point.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
