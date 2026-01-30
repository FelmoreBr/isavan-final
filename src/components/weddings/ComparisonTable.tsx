"use client";

import { Check, X } from "lucide-react";

const features = [
    { name: "Puntualidad Garantizada", isavan: true, bus: false, app: false },
    { name: "Acceso a Zonas Rurales", isavan: true, bus: false, app: "Parcial" },
    { name: "Conductor Profesional", isavan: true, bus: true, app: false },
    { name: "Privacidad y Exclusividad", isavan: true, bus: false, app: false },
    { name: "Climatización Tri-zona", isavan: true, bus: "Parcial", app: false },
    { name: "Seguridad 24/7", isavan: true, bus: true, app: false },
];

export default function ComparisonTable() {
    return (
        <section className="py-24 bg-[#0B132B]">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Compara la Experiencia
                    </h2>
                    <p className="text-gray-400">Por qué Isavan es la elección inteligente para tu gran día.</p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="py-6 px-4 text-gray-400 font-medium">Característica</th>
                                <th className="py-6 px-4 text-[#D4AF37] font-bold text-xl">Isavan</th>
                                <th className="py-6 px-4 text-gray-300 font-medium">Bus Tradicional</th>
                                <th className="py-6 px-4 text-gray-300 font-medium">Apps (Uber/Didi)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {features.map((feature, index) => (
                                <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="py-6 px-4 text-white font-medium">{feature.name}</td>
                                    <td className="py-6 px-4">
                                        <Check className="text-[#D4AF37] w-6 h-6" />
                                    </td>
                                    <td className="py-6 px-4">
                                        {feature.bus === true ? (
                                            <Check className="text-gray-500 w-5 h-5" />
                                        ) : feature.bus === false ? (
                                            <X className="text-red-900/50 w-5 h-5" />
                                        ) : (
                                            <span className="text-gray-500 text-sm">{feature.bus}</span>
                                        )}
                                    </td>
                                    <td className="py-6 px-4">
                                        {feature.app === true ? (
                                            <Check className="text-gray-500 w-5 h-5" />
                                        ) : feature.app === false ? (
                                            <X className="text-red-900/50 w-5 h-5" />
                                        ) : (
                                            <span className="text-gray-500 text-sm">{feature.app}</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
