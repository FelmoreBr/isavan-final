"use client";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Plane, Music } from "lucide-react";

// Configure Mapbox Token
mapboxgl.accessToken = "pk.eyJ1IjoibWFzdGVyb3AiLCJhIjoiY21rZ3cxa3d1MGNlcjNkcTNhZnRiZDl5NCJ9.MgUL07KwK0OaXeBVo9PWAg";

type MapContextValue = {
  map: mapboxgl.Map | null;
  isLoaded: boolean;
};

const MapContext = createContext<MapContextValue | null>(null);

export function useMap() {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMap must be used within a Map component");
  }
  return context;
}

interface MapProps extends Omit<Partial<mapboxgl.MapOptions>, "container"> {
  children?: ReactNode;
  className?: string;
  onClick?: (coords: [number, number]) => void;
}

const CHILE_BOUNDS: [[number, number], [number, number]] = [
  [-76.0, -56.0], // Suroeste (Aprox)
  [-66.0, -17.0]  // Noreste (Aprox)
];

const Map = forwardRef<mapboxgl.Map, MapProps>(function Map(
  { children, className, onClick, ...props },
  ref
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<mapboxgl.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [-71.5518, -33.0245],
      zoom: 9,
      maxBounds: CHILE_BOUNDS, // Task: Geofencing Chile
      ...props,
    });

    map.on("load", () => {
      setIsLoaded(true);
      map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "top-right");
    });

    if (onClick) {
      map.on("click", (e) => {
        onClick([e.lngLat.lng, e.lngLat.lat]);
      });
    }

    setMapInstance(map);

    return () => {
      map.remove();
    };
  }, []);

  useImperativeHandle(ref, () => mapInstance!, [mapInstance]);

  const contextValue = useMemo(
    () => ({
      map: mapInstance,
      isLoaded: isLoaded,
    }),
    [mapInstance, isLoaded]
  );

  return (
    <MapContext.Provider value={contextValue}>
      <div ref={containerRef} className={cn("relative w-full h-full min-h-[400px] rounded-3xl overflow-hidden border border-zinc-800", className)}>
        {mapInstance && children}
      </div>
    </MapContext.Provider>
  );
});

// --- MapRoute Component ---

type MapRouteProps = {
  id?: string;
  coordinates: [number, number][];
  color?: string;
  width?: number;
  opacity?: number;
  dashArray?: [number, number];
};

function MapRoute({
  id: propId,
  coordinates,
  color = "#FF8C00", // Isavan Orange (#FF8C00) requested
  width = 5,       // Width 5px requested
  opacity = 0.9,
  dashArray,
}: MapRouteProps) {
  const { map, isLoaded } = useMap();
  const autoId = useId();
  const id = propId ?? autoId;
  const sourceId = `route-source-${id}`;
  const layerId = `route-layer-${id}`;

  useEffect(() => {
    if (!isLoaded || !map) return;

    map.addSource(sourceId, {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: { type: "LineString", coordinates: [] },
      },
    });

    map.addLayer({
      id: layerId,
      type: "line",
      source: sourceId,
      layout: { "line-join": "round", "line-cap": "round" },
      paint: {
        "line-color": color,
        "line-width": width,
        "line-opacity": opacity,
        ...(dashArray && { "line-dasharray": dashArray }),
      },
    });

    return () => {
      try {
        if (map.getLayer(layerId)) map.removeLayer(layerId);
        if (map.getSource(sourceId)) map.removeSource(sourceId);
      } catch { /* ignore */ }
    };
  }, [isLoaded, map]);

  useEffect(() => {
    if (!isLoaded || !map || coordinates.length < 2) {
      // Clear route if coordinates are empty
      if (isLoaded && map) {
        const source = map.getSource(sourceId) as mapboxgl.GeoJSONSource;
        if (source) {
          source.setData({
            type: "Feature",
            properties: {},
            geometry: { type: "LineString", coordinates: [] },
          });
        }
      }
      return;
    }
    const source = map.getSource(sourceId) as mapboxgl.GeoJSONSource;
    if (source) {
      source.setData({
        type: "Feature",
        properties: {},
        geometry: { type: "LineString", coordinates },
      });
    }
  }, [isLoaded, map, coordinates, sourceId]);

  return null;
}

// --- Custom Icons ---

function IsavanPin() {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-[#FF8C00] blur-md opacity-40 group-hover:opacity-60 transition-opacity" />
      <div className="relative flex flex-col items-center">
        <div className="w-10 h-10 bg-zinc-950 rounded-2xl border-2 border-[#FF8C00] flex items-center justify-center shadow-2xl transform transition-transform group-hover:scale-110 group-hover:-translate-y-1">
          <MapPin className="w-6 h-6 text-[#FF8C00] fill-[#FF8C00]/10" />
        </div>
        <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-[#FF8C00] -mt-[2px]" />
      </div>
    </div>
  );
}

function AirportMarker() {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-blue-500 blur-md opacity-20 group-hover:opacity-40 transition-opacity" />
      <div className="relative flex flex-col items-center">
        <div className="w-10 h-10 bg-blue-600 rounded-2xl border-2 border-white flex items-center justify-center shadow-2xl transform transition-transform group-hover:scale-110 group-hover:-translate-y-1">
          <Plane className="w-6 h-6 text-white" />
        </div>
        <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white -mt-[2px]" />
      </div>
    </div>
  );
}

function ConcertMarker() {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-blue-500 blur-md opacity-30 group-hover:opacity-50 transition-opacity" />
      <div className="relative flex flex-col items-center">
        <div className="w-10 h-10 bg-blue-600 rounded-2xl border-2 border-white flex items-center justify-center shadow-2xl transform transition-transform group-hover:scale-110 group-hover:-translate-y-1">
          <Music className="w-6 h-6 text-white" />
        </div>
        <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white -mt-[2px]" />
      </div>
    </div>
  );
}

// --- MapMarker Component ---

type MapMarkerProps = {
  coordinates: [number, number];
  children?: ReactNode;
  draggable?: boolean;
  onDragEnd?: (coords: [number, number]) => void;
};

function MapMarker({ coordinates, children, draggable, onDragEnd }: MapMarkerProps) {
  const { map, isLoaded } = useMap();
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoaded || !map || !elementRef.current) return;

    if (markerRef.current) {
      markerRef.current.setLngLat(coordinates);
      return;
    }

    const marker = new mapboxgl.Marker({
      element: elementRef.current,
      draggable: draggable
    })
      .setLngLat(coordinates)
      .addTo(map);

    if (draggable && onDragEnd) {
      marker.on('dragend', () => {
        const lngLat = marker.getLngLat();

        // Task: Geofencing Chile (Continental)
        const lng = Math.max(CHILE_BOUNDS[0][0], Math.min(CHILE_BOUNDS[1][0], lngLat.lng));
        const lat = Math.max(CHILE_BOUNDS[0][1], Math.min(CHILE_BOUNDS[1][1], lngLat.lat));

        if (lng !== lngLat.lng || lat !== lngLat.lat) {
          marker.setLngLat([lng, lat]);
        }

        onDragEnd([lng, lat]);
      });
    }

    markerRef.current = marker;

    return () => {
      // Only remove if it's actually being unmounted
      // (This effect runs when coordinates change)
    };
  }, [isLoaded, map, coordinates, draggable]);

  // Handle unmount separately
  useEffect(() => {
    return () => {
      if (markerRef.current) {
        markerRef.current.remove();
        markerRef.current = null;
      }
    };
  }, []);

  return (
    <div className="hidden">
      <div ref={elementRef} className="cursor-pointer">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 10 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              duration: 0.5
            }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export { Map, MapRoute, MapMarker, IsavanPin, AirportMarker, ConcertMarker, CHILE_BOUNDS };

