'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Inicio', href: '/#inicio' },
    { name: 'Vehículos', href: '/#vehiculos' },
    { name: 'Conciertos', href: '/conciertos' },
    { name: 'Servicios', href: '/#servicios' },
    { name: 'Contacto', href: '/#contacto' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 px-4 md:px-6 py-3 md:py-4 bg-gradient-to-b from-black/90 via-black/60 to-transparent backdrop-blur-sm md:backdrop-blur-none md:bg-gradient-to-b md:from-black/50 md:to-transparent">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo - Responsive sizing */}
          <Link
            href="/"
            className="relative h-12 sm:h-14 md:h-24 w-auto max-w-[180px] sm:max-w-[220px] md:max-w-none transition-transform hover:scale-105 flex-shrink-0"
            aria-label="Ir al inicio"
          >
            <Image
              src="/images/logo.png"
              alt="Isavan - Transfer y Traslados"
              width={280}
              height={96}
              className="object-contain h-full w-auto"
              priority
              unoptimized
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-zinc-300 hover:text-green-500 transition-colors uppercase tracking-wide"
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/#contacto"
              className="px-6 py-3 rounded-full bg-green-600 text-white text-sm font-bold hover:bg-green-500 transition-all duration-300 shadow-lg shadow-green-900/30 hover:shadow-green-900/50 hover:scale-105"
            >
              Cotizar Ahora
            </Link>
          </div>

          {/* Mobile Menu Button - Higher z-index */}
          <button
            className="md:hidden text-white p-2.5 hover:bg-white/10 rounded-lg transition-colors relative z-[60]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Fixed with high z-index */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/98 z-[55] md:hidden flex flex-col items-center justify-center"
          style={{ minHeight: '100dvh' }}
        >
          {/* Close button inside overlay */}
          <button
            className="absolute top-4 right-4 text-white p-2.5 hover:bg-white/10 rounded-lg transition-colors z-[60]"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Cerrar menú"
          >
            <X size={32} />
          </button>

          <div className="flex flex-col items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-2xl font-bold text-white hover:text-green-500 transition-colors active:scale-95"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/#contacto"
              onClick={() => setIsMenuOpen(false)}
              className="mt-4 px-8 py-4 rounded-full bg-green-600 text-white text-lg font-bold shadow-xl shadow-green-900/40 active:scale-95"
            >
              Cotizar Ahora
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;