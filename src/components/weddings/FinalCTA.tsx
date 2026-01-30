"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function FinalCTA() {
    return (
        <section className="py-24 bg-[#0B132B] relative">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-[#1a2a4a] to-[#0B132B] border border-[#D4AF37]/30 rounded-3xl p-12 text-center relative overflow-hidden"
                >
                    {/* Decorative background circle */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[100px] -z-10" />

                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Asegura el transporte de tu boda hoy
                    </h2>
                    <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
                        No dejes la logística para el último minuto. Agenda una reunión o cotiza directamente por WhatsApp para conocer nuestros planes especiales de matrimonio.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <motion.a
                            href="https://wa.me/56984513302?text=Hola,%20quisiera%20cotizar%20transporte%20para%20mi%20boda."
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-3 px-10 py-5 bg-[#25D366] text-white font-bold rounded-full shadow-xl shadow-green-500/20 transition-all hover:bg-[#22c35e]"
                        >
                            <MessageCircle className="w-6 h-6" />
                            Cotizar por WhatsApp
                        </motion.a>

                        <div className="text-gray-400">
                            <p className="text-sm uppercase tracking-widest mb-1">Atención Inmediata</p>
                            <p className="text-white font-medium">+56 9 8451 3302</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
