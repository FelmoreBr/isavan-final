'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { enviarWhatsApp } from '@/lib/whatsapp';

interface CotizacionData {
  direccion: 'hacia' | 'desde';
  comuna: string;
  pasajeros: number;
  fecha: string;
  hora: string;
  tipoVehiculo: 'auto' | 'van';
  precio: number;
}

interface CotizadorAeropuertoProps {
  comunaSeleccionada?: string;
}

const CotizadorAeropuerto: React.FC<CotizadorAeropuertoProps> = ({ comunaSeleccionada }) => {
  const [direccion, setDireccion] = useState<'hacia' | 'desde'>('hacia');
  const [comuna, setComuna] = useState('');
  const [pasajeros, setPasajeros] = useState(1);
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [cotizacion, setCotizacion] = useState<CotizacionData | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Efecto para actualizar la comuna cuando se selecciona desde el carrusel
  useEffect(() => {
    if (comunaSeleccionada) {
      setComuna(comunaSeleccionada);
    }
  }, [comunaSeleccionada]);

  const comunas = [
    'Viña del Mar',
    'Concón',
    'Quilpué',
    'Villa Alemana',
    'Limache',
    'Olmué',
    'Quillota',
    'La Cruz'
  ];

  const tarifasAuto = {
    'Viña del Mar': 80000,
    'Concón': 85000,
    'Quilpué': 75000,
    'Villa Alemana': 75000,
    'Limache': 75000,
    'Olmué': 75000,
    'Quillota': 80000,
    'La Cruz': 80000
  };

  const tarifasVan = {
    'Viña del Mar': 130000,
    'Concón': 140000,
    'Quilpué': 120000,
    'Villa Alemana': 120000,
    'Limache': 120000,
    'Olmué': 120000,
    'Quillota': 130000,
    'La Cruz': 130000
  };

  const calcularPrecio = () => {
    if (!comuna) return 0;

    let precio = 0;
    const tipoVehiculo = pasajeros <= 2 ? 'auto' : 'van';

    if (tipoVehiculo === 'auto') {
      precio = tarifasAuto[comuna as keyof typeof tarifasAuto];
    } else {
      precio = tarifasVan[comuna as keyof typeof tarifasVan];
    }

    // Agregar $5000 extra si es "desde aeropuerto"
    if (direccion === 'desde') {
      precio += 5000;
    }

    return precio;
  };

  const handleCotizar = () => {
    if (!comuna || !fecha || !hora) {
      alert('Por favor completa todos los campos');
      return;
    }

    const precio = calcularPrecio();
    const tipoVehiculo = pasajeros <= 2 ? 'auto' : 'van';

    const nuevaCotizacion: CotizacionData = {
      direccion,
      comuna,
      pasajeros,
      fecha,
      hora,
      tipoVehiculo,
      precio
    };

    setCotizacion(nuevaCotizacion);
    setShowModal(true);
  };

  const handleAgendar = () => {
    if (!cotizacion) return;

    const mensaje = `🚐 *COTIZACIÓN TRASLADO AEROPUERTO*\n\n` +
      `📍 *Dirección:* ${cotizacion.direccion === 'hacia' ? 'Hacia Aeropuerto' : 'Desde Aeropuerto'}\n` +
      `🏘️ *Comuna:* ${cotizacion.comuna}\n` +
      `👥 *Pasajeros:* ${cotizacion.pasajeros}\n` +
      `🚗 *Vehículo:* ${cotizacion.tipoVehiculo === 'auto' ? 'Automóvil' : 'Van'}\n` +
      `📅 *Fecha:* ${cotizacion.fecha}\n` +
      `🕐 *Hora:* ${cotizacion.hora}\n` +
      `💰 *Precio:* $${cotizacion.precio.toLocaleString()}\n\n` +
      `¡Quiero agendar este viaje!`;

    enviarWhatsApp(mensaje);
    setShowModal(false);
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 shadow-2xl border border-white/20 w-full max-w-full overflow-hidden">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-4 text-center px-2">
        {direccion === 'hacia' ? 'Cotiza tu Traslado al Aeropuerto' : 'Cotiza tu Traslado desde el Aeropuerto'}
      </h2>

      {/* Toggle Dirección - Más compacto */}
      <div className="flex mb-6 justify-center">
        <button
          onClick={() => setDireccion('hacia')}
          className={`flex-1 md:flex-none py-2.5 px-4 rounded-l-xl font-medium text-xs md:text-sm transition-all ${direccion === 'hacia'
            ? 'bg-green-500 text-white shadow-lg'
            : 'bg-white/20 text-white hover:bg-white/30'
            }`}
        >
          Hacia Aeropuerto
        </button>
        <button
          onClick={() => setDireccion('desde')}
          className={`flex-1 md:flex-none py-2.5 px-4 rounded-r-xl font-medium text-xs md:text-sm transition-all ${direccion === 'desde'
            ? 'bg-green-500 text-white shadow-lg'
            : 'bg-white/20 text-white hover:bg-white/30'
            }`}
        >
          Desde Aeropuerto
        </button>
      </div>

      {/* Layout Responsivo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
        {/* Comuna */}
        <div className="w-full">
          <label className="block text-white font-medium mb-1.5 text-xs md:text-sm">
            {direccion === 'hacia' ? 'Origen' : 'Destino'}
          </label>
          <select
            value={comuna}
            onChange={(e) => setComuna(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30 focus:border-green-400 focus:outline-none backdrop-blur-sm text-sm appearance-none"
          >
            <option value="" className="text-gray-800">Selecciona comuna</option>
            {comunas.map((c) => (
              <option key={c} value={c} className="text-gray-800">{c}</option>
            ))}
          </select>
        </div>

        {/* Fecha y Hora */}
        <div className="w-full">
          <label className="block text-white font-medium mb-1.5 text-xs md:text-sm">
            Fecha y Hora
          </label>
          <input
            type="datetime-local"
            value={fecha && hora ? `${fecha}T${hora}` : ''}
            onChange={(e) => {
              const [date, time] = e.target.value.split('T');
              setFecha(date || '');
              setHora(time || '');
            }}
            min={new Date().toISOString().slice(0, 16)}
            className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30 focus:border-green-400 focus:outline-none backdrop-blur-sm text-sm"
          />
        </div>

        {/* Tipo de Vehículo */}
        <div className="w-full">
          <label className="block text-white font-medium mb-1.5 text-xs md:text-sm">
            Tipo de Vehículo
          </label>
          <select
            value={pasajeros}
            onChange={(e) => setPasajeros(Number(e.target.value))}
            className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30 focus:border-green-400 focus:outline-none backdrop-blur-sm text-sm appearance-none"
          >
            <option value={1} className="text-gray-800">Auto (1-2)</option>
            <option value={3} className="text-gray-800">Van (3-8)</option>
          </select>
        </div>

        {/* Botón Cotizar */}
        <div className="w-full mt-2 md:mt-0">
          <button
            onClick={handleCotizar}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-3.5 px-4 rounded-lg hover:from-green-600 hover:to-green-700 active:scale-95 transition-all duration-200 shadow-lg text-sm uppercase tracking-wide"
          >
            Cotizar Ahora
          </button>
        </div>
      </div>

      {/* Modal de Cotización renderizado con Portal */}
      {mounted && showModal && cotizacion && createPortal(
        <div className="fixed inset-0 bg-black/50 animate-in fade-in duration-300 flex items-center justify-center p-4" style={{ zIndex: 999999 }} onClick={() => setShowModal(false)}>
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 max-w-md w-full shadow-2xl shadow-black/50 border border-slate-700/50 relative overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300" onClick={(e) => e.stopPropagation()}>
            {/* Efecto de brillo superior */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>

            {/* Badge de descuento */}
            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              COTIZACIÓN
            </div>

            <h3 className="text-2xl font-bold text-white mb-6 text-center bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Resumen de Cotización
            </h3>

            <div className="space-y-4 text-slate-300">
              <div className="flex justify-between items-center py-2 border-b border-slate-700/50">
                <span className="font-medium text-slate-400">Dirección:</span>
                <span className="text-white font-semibold">{cotizacion.direccion === 'hacia' ? 'Hacia Aeropuerto' : 'Desde Aeropuerto'}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-700/50">
                <span className="font-medium text-slate-400">Comuna:</span>
                <span className="text-white font-semibold">{cotizacion.comuna}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-700/50">
                <span className="font-medium text-slate-400">Pasajeros:</span>
                <span className="text-white font-semibold">{cotizacion.pasajeros}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-700/50">
                <span className="font-medium text-slate-400">Vehículo:</span>
                <span className="text-white font-semibold">{cotizacion.tipoVehiculo === 'auto' ? 'Automóvil' : 'Van'}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-700/50">
                <span className="font-medium text-slate-400">Fecha:</span>
                <span className="text-white font-semibold">{cotizacion.fecha}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-700/50">
                <span className="font-medium text-slate-400">Hora:</span>
                <span className="text-white font-semibold">{cotizacion.hora}</span>
              </div>

              {/* Precio destacado */}
              <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-2xl p-6 mt-6 border border-slate-600/30">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-slate-300">Total:</span>
                  <div className="text-right">
                    <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
                      ${cotizacion.precio.toLocaleString()}
                    </div>
                    <div className="text-sm text-slate-400 mt-1">Precio final</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowModal(false);
                }}
                className="flex-1 bg-gradient-to-r from-slate-700 to-slate-600 text-slate-300 font-semibold py-3 px-6 rounded-xl hover:from-slate-600 hover:to-slate-500 transition-all duration-200 border border-slate-600/50 hover:border-slate-500/50"
              >
                Cerrar
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAgendar();
                }}
                className="flex-1 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-500 hover:via-blue-400 hover:to-cyan-400 transition-all duration-200 shadow-lg hover:shadow-blue-500/25 transform hover:scale-105"
              >
                📱 Agendar por WhatsApp
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default CotizadorAeropuerto;