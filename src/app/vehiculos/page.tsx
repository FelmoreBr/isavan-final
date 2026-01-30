import FleetSection from '@/components/home/FleetSection';

export default function VehiculosPage() {
    return (
        // Se agrega padding-top (pt-20) para evitar que el NavBar fijo cubra el contenido
        <main className="min-h-screen pt-20 bg-zinc-900">
            <FleetSection />
        </main>
    );
}
