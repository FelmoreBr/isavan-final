import React from 'react';
import { Metadata } from 'next';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import WeddingHero from '@/components/weddings/WeddingHero';
import PainPoints from '@/components/weddings/PainPoints';
import WeddingFleet from '@/components/weddings/WeddingFleet';
import ComparisonTable from '@/components/weddings/ComparisonTable';
import FinalCTA from '@/components/weddings/FinalCTA';

export const metadata: Metadata = {
    title: 'Isavan Weddings | Transporte de Lujo para Matrimonios',
    description: 'Logística premium para tu boda en la V Región. Traslados seguros, puntuales y elegantes para novios e invitados.',
};

export default function WeddingsPage() {
    return (
        <main className="w-full min-h-screen bg-[#0B132B] text-white scroll-smooth">
            <NavBar />

            <WeddingHero />

            <div className="relative">
                {/* Subtle separator or transition element if needed */}
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />

                <PainPoints />

                <div className="w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />

                <WeddingFleet />

                <div className="w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />

                <ComparisonTable />

                <FinalCTA />
            </div>

            <Footer />
        </main>
    );
}
