import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';
import { fetchComunas } from '@/lib/queries';

const Footer = async () => {
    const comunas = await fetchComunas();

    // Fallback in case Sanity fetch fails or is empty during build
    const displayComunas = comunas.length > 0 ? comunas : [
        { name: 'Viña del Mar', slug: 'vina-del-mar' },
        { name: 'Concón', slug: 'concon' },
        { name: 'Quilpué', slug: 'quilpue' },
        { name: 'Villa Alemana', slug: 'villa-alemana' },
    ];

    return (
        <footer className="bg-zinc-950 text-gray-300 py-12 border-t border-zinc-800">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-white tracking-tighter">ISAVAN<span className="text-green-500">.</span></h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Transporte privado de lujo en la V Región. Conectamos destinos con puntualidad, seguridad y elegancia.
                        </p>
                        <div className="flex space-x-4 pt-2">
                            <a href="#" className="hover:text-green-500 transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="hover:text-green-500 transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="hover:text-green-500 transition-colors"><Twitter size={20} /></a>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-white">Contacto</h4>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start space-x-3">
                                <MapPin size={18} className="text-green-500 mt-0.5 shrink-0" />
                                <span>Viña del Mar, Región de Valparaíso, Chile</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone size={18} className="text-green-500 shrink-0" />
                                <a href="tel:+56984513302" className="hover:text-white transition-colors">+56 9 8451 3302</a>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail size={18} className="text-green-500 shrink-0" />
                                <a href="mailto:contacto@isavan.cl" className="hover:text-white transition-colors">contacto@isavan.cl</a>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-white">Enlaces Rápidos</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/" className="hover:text-green-500 transition-colors">Inicio</Link></li>
                            <li><Link href="/#servicios" className="hover:text-green-500 transition-colors">Servicios</Link></li>
                            <li><Link href="/comunas" className="hover:text-green-500 transition-colors">Comunas</Link></li>
                            <li><Link href="/conciertos" className="hover:text-green-500 transition-colors">Conciertos</Link></li>
                            <li><Link href="/#contacto" className="hover:text-green-500 transition-colors">Cotizar</Link></li>
                        </ul>
                    </div>

                    {/* SEO Coverage Section */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-white">
                            <Link href="/comunas" className="hover:text-green-500 transition-colors">
                                Cobertura V Región
                            </Link>
                        </h4>
                        <ul className="grid grid-cols-1 gap-2 text-sm">
                            {displayComunas.slice(0, 8).map((destino) => (
                                <li key={destino.slug}>
                                    <Link
                                        href={`/comunas/${destino.slug}`}
                                        className="hover:text-green-500 transition-colors flex items-center group"
                                    >
                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                        <span className="truncate max-w-[200px]">
                                            {destino.name.split(':')[0].replace('TRANSFER ', '').replace('RADIO TAXI ', '')}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="border-t border-zinc-800 mt-12 pt-8 text-center text-xs text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Isavan Viajes. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
