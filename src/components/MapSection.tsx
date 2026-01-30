"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Map, MapRoute, MapMarker, IsavanPin, AirportMarker, ConcertMarker, CHILE_BOUNDS } from '@/components/ui/map/map';
import { MapFeedback } from '@/components/ui/map/MapFeedback';
import { MapPin, Plane, Car, Music, Navigation, Send, Loader2, Info, LocateFixed } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const VENUES = {
    AIRPORT: { name: "Aeropuerto SCL", coords: [-70.7944, -33.3930] as [number, number] },
    NACIONAL: { name: "Estadio Nacional", coords: [-70.6120, -33.4642] as [number, number] },
    MOVISTAR: { name: "Movistar Arena", coords: [-70.6603, -33.4627] as [number, number] },
    MONUMENTAL: { name: "Estadio Monumental", coords: [-70.6059, -33.5064] as [number, number] },
};

const INITIAL_ORIGIN = {
    name: "Viña del Mar",
    coords: [-71.5518, -33.0245] as [number, number]
};

export default function MapSection() {
    const [origin, setOrigin] = useState(INITIAL_ORIGIN);
    const [destination, setDestination] = useState(VENUES.AIRPORT);
    const [route, setRoute] = useState<[number, number][]>([]);
    const [routeInfo, setRouteInfo] = useState<{ distance: number; duration: number } | null>(null);
    const [loading, setLoading] = useState(false);
    const [isLocating, setIsLocating] = useState(false);
    const [addressLoading, setAddressLoading] = useState(false);
    const mapRef = useRef<mapboxgl.Map | null>(null);

    // Reverse Geocoding to get address from coordinates
    const fetchAddress = async (coords: [number, number]) => {
        setAddressLoading(true);
        try {
            // Using the token provided in the existing map.tsx
            const token = "pk.eyJ1IjoibWFzdGVyb3AiLCJhIjoiY21rZ3cxa3d1MGNlcjNkcTNhZnRiZDl5NCJ9.MgUL07KwK0OaXeBVo9PWAg";
            const response = await fetch(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${coords[0]},${coords[1]}.json?access_token=${token}&language=es`
            );
            const data = await response.json();
            if (data.features && data.features.length > 0) {
                const place = data.features[0];
                setOrigin({
                    name: place.place_name,
                    coords: coords
                });
            }
        } catch (error) {
            console.error("Error fetching address:", error);
        } finally {
            setAddressLoading(false);
        }
    };

    const fetchRoute = useCallback(async () => {
        if (!origin.coords || !destination.coords) return;

        setLoading(true);
        try {
            const response = await fetch(
                `https://router.project-osrm.org/route/v1/driving/${origin.coords[0]},${origin.coords[1]};${destination.coords[0]},${destination.coords[1]}?overview=full&geometries=geojson`
            );
            const data = await response.json();
            if (data.routes && data.routes.length > 0) {
                setRoute(data.routes[0].geometry.coordinates);
                setRouteInfo({
                    distance: data.routes[0].distance / 1000, // km
                    duration: data.routes[0].duration / 60, // min
                });
            }
        } catch (error) {
            console.error("Error fetching route:", error);
        } finally {
            setLoading(false);
        }
    }, [origin.coords, destination.coords]);

    useEffect(() => {
        fetchRoute();
    }, [fetchRoute]);

    const handleMyLocation = () => {
        if (!navigator.geolocation) {
            alert("Tu navegador no soporta geolocalización. Por favor, selecciona tu punto en el mapa.");
            return;
        }

        setIsLocating(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const newCoords: [number, number] = [position.coords.longitude, position.coords.latitude];

                // Task: Geofencing Chile (Check if GPS is in Chile)
                const isWithinChile =
                    newCoords[0] >= CHILE_BOUNDS[0][0] && newCoords[0] <= CHILE_BOUNDS[1][0] &&
                    newCoords[1] >= CHILE_BOUNDS[0][1] && newCoords[1] <= CHILE_BOUNDS[1][1];

                if (!isWithinChile) {
                    alert("📍 Tu ubicación actual está fuera del territorio de Chile continental manejado por Isavan. Por favor, selecciona un punto válido en el mapa.");
                    setIsLocating(false);
                    return;
                }

                fetchAddress(newCoords);
                if (mapRef.current) {
                    mapRef.current.flyTo({ center: newCoords, zoom: 14 });
                }
                setIsLocating(false);
            },
            (error) => {
                console.error("Error GPS:", error);
                // Task: Error Handling (GPS denial)
                if (error.code === error.PERMISSION_DENIED) {
                    alert("📍 Permiso de ubicación denegado. No te preocupes, puedes arrastrar el marcador naranja en el mapa hacia tu punto de inicio o hacer clic en cualquier lugar para seleccionarlo.");
                } else {
                    alert("No pudimos obtener tu ubicación. Por favor, selecciona manualmente en el mapa.");
                }
                setIsLocating(false);
            },
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        );
    };

    const handleMapClick = (coords: [number, number]) => {
        fetchAddress(coords);
    };

    const handleWhatsAppQuote = () => {
        if (!routeInfo) {
            alert("Espera a que se trace la ruta para cotizar.");
            return;
        }

        const gMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin.coords[1]},${origin.coords[0]}&destination=${destination.coords[1]},${destination.coords[0]}`;

        // Task: Validación de Datos (Detailed message)
        const message = encodeURIComponent(
            `🚐 *COTIZACIÓN DE TRASLADO ISAVAN*\n\n` +
            `📍 *Origen:* ${origin.name}\n` +
            `🏁 *Destino:* ${destination.name}\n` +
            `📏 *Distancia:* ${routeInfo.distance.toFixed(1)} km\n` +
            `⏱️ *Tiempo est:* ${Math.round(routeInfo.duration)} min\n` +
            `🗺️ *Ruta:* ${gMapsUrl}\n\n` +
            `¡Hola! Quisiera cotizar este traslado. ¿Podrían informarme la disponibilidad y tarifa?`
        );
        window.open(`https://wa.me/56984513302?text=${message}`, '_blank');
    };

    return (
        <section id="mapa-cotizador" className="w-full py-24 bg-zinc-950 flex flex-col items-center overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-sm font-medium mb-4"
                        >
                            <Navigation className="w-4 h-4" />
                            Cotizador Inteligente
                        </motion.div>
                        <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight text-white">
                            Calcula tu <span className="text-orange-500">Ruta Especial</span>
                        </h2>
                        <p className="text-gray-400 text-lg">
                            Selecciona tu ubicación exacta y nosotros nos encargamos del resto.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
                    {/* Controls Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="p-8 rounded-[2rem] bg-zinc-900/50 border border-zinc-800 backdrop-blur-xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Car className="w-24 h-24 text-white" />
                            </div>

                            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-white">
                                <div className="p-2 rounded-lg bg-orange-500">
                                    <MapPin className="text-black w-5 h-5" />
                                </div>
                                Detalles
                            </h3>

                            <div className="space-y-6">
                                {/* Origin Selector */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Inicio</label>
                                        <button
                                            onClick={handleMyLocation}
                                            disabled={isLocating}
                                            className="text-xs flex items-center gap-1.5 text-orange-500 hover:text-orange-400 transition-colors bg-orange-500/5 px-3 py-1.5 rounded-full border border-orange-500/10"
                                        >
                                            {isLocating ? <Loader2 className="w-3 h-3 animate-spin" /> : <Navigation className="w-3 h-3" />}
                                            Mi ubicación
                                        </button>
                                    </div>
                                    <div className="relative">
                                        <div className={cn(
                                            "w-full bg-zinc-800/50 border border-zinc-700 rounded-2xl p-4 text-white text-sm min-h-[56px] flex items-center gap-3 transition-all",
                                            addressLoading && "opacity-50"
                                        )}>
                                            <div className="w-2 h-2 rounded-full bg-orange-500 shrink-0 shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
                                            <span className="line-clamp-2">{origin.name}</span>
                                            {addressLoading && <Loader2 className="w-4 h-4 animate-spin ml-auto" />}
                                        </div>
                                        <p className="text-[10px] text-zinc-500 mt-2 px-1 italic">
                                            * Arrastra el pin naranja en el mapa para ajustar
                                        </p>
                                    </div>
                                </div>

                                {/* Destination Selector */}
                                <div className="space-y-4 pt-4 border-t border-zinc-800">
                                    <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider block">Destino Final</label>
                                    <div className="grid grid-cols-1 gap-3">
                                        <select
                                            value={Object.keys(VENUES).find(key => VENUES[key as keyof typeof VENUES].name === destination.name) || "AIRPORT"}
                                            onChange={(e) => setDestination(VENUES[e.target.value as keyof typeof VENUES])}
                                            className="w-full bg-zinc-800/50 border border-zinc-700 rounded-2xl p-4 text-white focus:ring-2 focus:ring-orange-500 outline-none transition-all cursor-pointer appearance-none"
                                        >
                                            <optgroup label="Aeropuerto" className="bg-zinc-900 text-white">
                                                <option value="AIRPORT">Aeropuerto SCL</option>
                                            </optgroup>
                                            <optgroup label="Eventos / Conciertos" className="bg-zinc-900 text-white">
                                                <option value="NACIONAL">Estadio Nacional</option>
                                                <option value="MOVISTAR">Movistar Arena</option>
                                                <option value="MONUMENTAL">Estadio Monumental</option>
                                            </optgroup>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stats Card (Desktop only - floating version below for mobile) */}
                    </div>

                    {/* Map Area */}
                    <div className="lg:col-span-8 h-[500px] lg:h-[700px] rounded-[2.5rem] overflow-hidden border border-zinc-800 shadow-2xl relative group">
                        {/* Map Overlay Loading */}
                        <AnimatePresence>
                            {loading && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 bg-zinc-950/20 backdrop-blur-[2px] z-30 flex items-center justify-center pointer-events-none"
                                >
                                    <div className="bg-zinc-900/80 border border-white/10 px-6 py-3 rounded-full flex items-center gap-3 shadow-2xl">
                                        <div className="w-2 h-2 bg-[#FF8C00] rounded-full animate-bounce" />
                                        <div className="w-2 h-2 bg-[#FF8C00] rounded-full animate-bounce [animation-delay:0.2s]" />
                                        <div className="w-2 h-2 bg-[#FF8C00] rounded-full animate-bounce [animation-delay:0.4s]" />
                                        <span className="text-sm font-medium text-white ml-2">Trazando ruta...</span>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <Map
                            ref={mapRef}
                            center={origin.coords}
                            zoom={9}
                            className="h-full w-full"
                            onClick={handleMapClick}
                        >
                            <MapRoute coordinates={route} />

                            <MapMarker
                                coordinates={origin.coords}
                                draggable
                                onDragEnd={(coords: [number, number]) => fetchAddress(coords)}
                            >
                                <IsavanPin />
                            </MapMarker>

                            <MapMarker
                                coordinates={destination.coords}
                                draggable
                                onDragEnd={(coords: [number, number]) => {
                                    setDestination({
                                        name: "Punto manual",
                                        coords: coords
                                    });
                                }}
                            >
                                {destination.name.includes("Estadio") || destination.name.includes("Arena") ? (
                                    <ConcertMarker />
                                ) : (
                                    <AirportMarker />
                                )}
                            </MapMarker>
                        </Map>

                        <MapFeedback
                            isVisible={!!routeInfo && !loading}
                            distance={routeInfo?.distance ? routeInfo.distance * 1000 : undefined}
                            duration={routeInfo?.duration ? routeInfo.duration * 60 : undefined}
                            address={origin.name}
                            onLocate={handleMyLocation}
                        />
                    </div>
                </div>

                {/* Info Text */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-zinc-900 pt-12">
                    <div className="flex items-center gap-4">
                        <div className="shrink-0 w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                            <Info className="text-orange-500 w-6 h-6" />
                        </div>
                        <p className="text-sm text-gray-500 leading-relaxed text-left">
                            Cálculo basado en las rutas más rápidas y seguras disponibles. El tiempo puede variar según el tráfico.
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="shrink-0 w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                            <Car className="text-orange-500 w-6 h-6" />
                        </div>
                        <p className="text-sm text-gray-500 leading-relaxed text-left">
                            Nuestra flota incluye SUV, Vans y vehículos de alta gama para asegurar tu comodidad en cada trayecto.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
