"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, Navigation, LocateFixed } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MapFeedbackProps {
    address?: string;
    distance?: number; // in meters
    duration?: number; // in seconds
    isVisible: boolean;
    onLocate?: () => void;
}

export function MapFeedback({ address, distance, duration, isVisible, onLocate }: MapFeedbackProps) {
    const formattedDistance = distance ? (distance / 1000).toFixed(1) + ' km' : '-- km';
    const formattedDuration = duration ? Math.round(duration / 60) + ' min' : '-- min';

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 w-[90%] max-w-md"
                >
                    <div className="bg-zinc-950/80 backdrop-blur-xl border border-white/10 rounded-3xl p-4 shadow-2xl overflow-hidden relative group">
                        {/* Branded accent line */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FF8C00] to-transparent opacity-50" />

                        <div className="flex items-center gap-4">
                            <div className="flex-1 space-y-3">
                                <div className="flex items-start gap-3">
                                    <div className="mt-1 p-1.5 rounded-lg bg-[#FF8C00]/20 text-[#FF8C00]">
                                        <MapPin className="w-4 h-4" />
                                    </div>
                                    <div className="space-y-0.5">
                                        <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Dirección Detectada</p>
                                        <p className="text-sm font-medium text-white line-clamp-1">
                                            {address || "Calculando ubicación..."}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-1">
                                    <div className="flex items-center gap-3">
                                        <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400">
                                            <Navigation className="w-4 h-4" />
                                        </div>
                                        <div className="space-y-0.5">
                                            <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Distancia</p>
                                            <p className="text-sm font-bold text-white">{formattedDistance}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 border-l border-white/5 pl-4">
                                        <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                                            <Clock className="w-4 h-4" />
                                        </div>
                                        <div className="space-y-0.5">
                                            <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Tiempo</p>
                                            <p className="text-sm font-bold text-white">{formattedDuration}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={onLocate}
                                className="p-3 rounded-2xl bg-[#FF8C00]/10 text-[#FF8C00] hover:bg-[#FF8C00] hover:text-black transition-all active:scale-95 border border-[#FF8C00]/20"
                            >
                                <LocateFixed className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
