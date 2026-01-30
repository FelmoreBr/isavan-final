import React from 'react';
import { Clock, Car, ShieldCheck } from 'lucide-react';

const ValueProps = () => {
    const props = [
        {
            icon: <Clock className="w-12 h-12 text-green-500 mb-4" />,
            title: "Puntualidad Garantizada",
            description: "Tu tiempo es oro. Llegamos 15 minutos antes de tu hora programada, siempre."
        },
        {
            icon: <Car className="w-12 h-12 text-green-500 mb-4" />,
            title: "Viaje Exclusivo",
            description: "Sin esperas ni desvíos. Un vehículo privado solo para ti y tus acompañantes."
        },
        {
            icon: <ShieldCheck className="w-12 h-12 text-green-500 mb-4" />,
            title: "Seguridad Total",
            description: "Conductores profesionales, vehículos monitoreados y mantenciones al día."
        }
    ];

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {props.map((prop, index) => (
                        <div key={index} className="flex flex-col items-center text-center p-6 rounded-2xl hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                            <div className="bg-green-50 p-4 rounded-full mb-4">
                                {prop.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{prop.title}</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {prop.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ValueProps;
