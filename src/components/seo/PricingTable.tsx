import React from 'react';
import { Car, Users, Briefcase } from 'lucide-react';

const PricingTable = () => {
    const prices = [
        {
            type: "Sedan Ejecutivo",
            passengers: "1-3 Pasajeros",
            luggage: "2 Maletas Grandes",
            price: "Desde $25.000",
            features: ["Aire Acondicionado", "Wifi a bordo", "Agua mineral"]
        },
        {
            type: "Van Familiar",
            passengers: "4-7 Pasajeros",
            luggage: "5 Maletas Grandes",
            price: "Desde $45.000",
            features: ["Amplio maletero", "Asientos reclinables", "Cargadores USB"]
        },
        {
            type: "Minibus",
            passengers: "8-19 Pasajeros",
            luggage: "15 Maletas Grandes",
            price: "Cotizar",
            features: ["Ideal grupos grandes", "Audio profesional", "Conductor profesional"]
        }
    ];

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse bg-white rounded-lg overflow-hidden shadow-lg">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="p-4 text-sm font-semibold uppercase tracking-wider">Tipo Vehículo</th>
                        <th className="p-4 text-sm font-semibold uppercase tracking-wider">Capacidad</th>
                        <th className="p-4 text-sm font-semibold uppercase tracking-wider">Equipaje</th>
                        <th className="p-4 text-sm font-semibold uppercase tracking-wider">Precio Estimado</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {prices.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                            <td className="p-4 font-medium text-gray-900 flex items-center gap-2">
                                <Car className="w-5 h-5 text-green-500" />
                                {item.type}
                            </td>
                            <td className="p-4 text-gray-600">
                                <div className="flex items-center gap-2">
                                    <Users className="w-4 h-4 text-gray-400" />
                                    {item.passengers}
                                </div>
                            </td>
                            <td className="p-4 text-gray-600">
                                <div className="flex items-center gap-2">
                                    <Briefcase className="w-4 h-4 text-gray-400" />
                                    {item.luggage}
                                </div>
                            </td>
                            <td className="p-4 font-bold text-green-600">
                                {item.price}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PricingTable;
