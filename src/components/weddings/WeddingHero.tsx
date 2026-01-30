"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function WeddingHero() {
    return (
        <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-[#0B132B]">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/wedding-bg.png"
                    alt="Luxury Wedding Background"
                    fill
                    className="object-cover opacity-40"
                    priority
                />
            </div>

            {/* Background Overlay with a subtle gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#0B132B] z-10" />

            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-20 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#D4AF37] rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#D4AF37] rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-6 relative z-20 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-block px-4 py-1 mb-6 border border-[#D4AF37] text-[#D4AF37] text-sm tracking-[0.2em] uppercase rounded-full">
                        Isavan Weddings
                    </span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                        Tu entrada es para las cámaras. <br />
                        <span className="text-[#D4AF37]">Tu retorno es nuestra responsabilidad.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light">
                        Logística premium para bodas. Olvida el estrés de las Apps y los buses.
                        Garantizamos un regreso seguro y con clase para ti y tus invitados.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <motion.a
                            href="https://wa.me/56984513302?text=Hola,%20quisiera%20cotizar%20transporte%20para%20mi%20boda."
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-[#D4AF37] text-[#0B132B] font-bold rounded-lg shadow-lg shadow-[#D4AF37]/20 transition-all hover:bg-[#C5A028]"
                        >
                            Cotizar Transporte
                        </motion.a>
                        <button className="px-8 py-4 border border-white/20 text-white font-medium rounded-lg hover:bg-white/5 transition-all">
                            Ver Servicios
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
            >
                <div className="w-[1px] h-16 bg-gradient-to-b from-[#D4AF37] to-transparent" />
            </motion.div>
        </section>
    );
}
