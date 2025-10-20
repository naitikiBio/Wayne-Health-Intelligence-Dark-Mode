import * as React from "react";
import { useMemo } from "react";
import { MapContainer, TileLayer, Polygon, Tooltip, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";
import L from "leaflet";
import { healthHexbinData } from "../data/mockData";

// Add JSX namespace
declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
      button: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
      h2: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
      p: React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>;
      span: React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
      strong: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

// Leaflet marker icon fix
// @ts-ignore
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Updated Hex type to match the new data structure
type Hex = {
  id: number;
  coordinates: [number, number][];
  googleTrends: number;
  socialMediaChatter: number;
  newsArticles: number;
  healthSignal: number;
};

interface Business {
  lat: number;
  lng: number;
  name: string;
  address: string;
}

export function HealthMap({ selectedBusiness }: { selectedBusiness?: Business }) {
  const center: [number, number] = [42.25, -83.17]; // Centered on Detroit/Wayne County

  // The data is now directly from the import
  const allHexbins: Hex[] = healthHexbinData;

  // Color scale for health signal intensity
  const STOPS: [number, string][] = [
    [0.0, "#4AA784"],  // Low signal (cool/quiet): green
    [0.2, "#BFE2C7"],  // Low-medium: mint
    [0.4, "#F2EFC6"],  // Medium: sand
    [0.6, "#F2C49A"],  // Medium-high: peach
    [0.8, "#E29578"],  // High: salmon
    [1.0, "#C0546A"],  // Very high (hotspot): rose
  ];

  function clamp(x: number, a: number, b: number) {
    return Math.max(a, Math.min(b, x));
  }
  function lerp(a: number, b: number, t: number) {
    return a + (b - a) * t;
  }
  function hexToRgb(h: string) {
    const s = h.replace("#", "");
    const n = parseInt(s, 16);
    return [n >> 16, (n >> 8) & 255, n & 255];
  }
  function rgbToHex(r: number, g: number, b: number) {
    const v = (Math.round(r) << 16) + (Math.round(g) << 8) + Math.round(b);
    return `#${v.toString(16).padStart(6, "0")}`;
  }
  function lerpHex(c0: string, c1: string, t: number) {
    const [r0, g0, b0] = hexToRgb(c0);
    const [r1, g1, b1] = hexToRgb(c1);
    return rgbToHex(lerp(r0, r1, t), lerp(g0, g1, t), lerp(b0, b1, t));
  }

  // normalize healthSignal for color scaling
  const { minSignal, maxSignal } = useMemo(() => {
    let min = Number.POSITIVE_INFINITY,
      max = Number.NEGATIVE_INFINITY;
    for (const h of allHexbins) {
      min = Math.min(min, h.healthSignal);
      max = Math.max(max, h.healthSignal);
    }
    return { minSignal: isFinite(min) ? min : 0, maxSignal: isFinite(max) ? max : 1 };
  }, [allHexbins]);

  function normalizedSignal(h: Hex): number {
    const signal = clamp((h.healthSignal - minSignal) / Math.max(1, maxSignal - minSignal), 0, 1);
    return signal;
  }

  function colorFor(x: number) {
    const v = clamp(x, 0, 1);
    for (let i = 1; i < STOPS.length; i++) {
      const [p0, c0] = STOPS[i - 1];
      const [p1, c1] = STOPS[i];
      if (v <= p1) {
        const t = (v - p0) / (p1 - p0);
        return lerpHex(c0, c1, t);
      }
    }
    return STOPS[STOPS.length - 1][1];
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
      className="bg-gray-800 rounded-lg shadow-lg p-6"
    >
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-white mb-2">Health Signal Map</h2>
        <p className="text-gray-400 mb-4">
          Health intensity is visualized by hexagons colored by a composite Health Signal Index (HSI).
          The darker the hexagon, the more intense the health signal.
        </p>
      </div>

      <div className="h-[600px] rounded-lg overflow-hidden border border-gray-700">
        <MapContainer 
          center={center} 
          zoom={10} 
          zoomControl={true} 
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={true}
          maxBounds={[
            [42.040, -83.560], // Southwest corner
            [42.451, -82.910]  // Northeast corner
          ]}
          maxBoundsViscosity={1.0}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* HEX SURFACE */}
          {allHexbins.map((hex) => {
            const signal = normalizedSignal(hex);
            return (
              <Polygon
                key={hex.id}
                positions={hex.coordinates as [number, number][]}
                pathOptions={{ 
                  stroke: false,
                  fillColor: colorFor(signal), 
                  fillOpacity: 0.6 
                }}
              >
                <Tooltip direction="top" sticky>
                  <div className="bg-gray-900/90 p-2 rounded">
                    <div className="text-white font-semibold">Health Signal: {hex.healthSignal.toFixed(2)}</div>
                    <div className="text-xs text-gray-200 mt-1">
                      <div>Google Trends: {hex.googleTrends}</div>
                      <div>Social Chatter: {hex.socialMediaChatter}</div>
                      <div>News Articles: {hex.newsArticles}</div>
                    </div>
                  </div>
                </Tooltip>
              </Polygon>
            );
          })}

          {selectedBusiness && (
            <Marker position={[selectedBusiness.lat, selectedBusiness.lng]}>
              <Popup>
                <div className="bg-gray-800 p-2 rounded text-white">
                  <strong>{selectedBusiness.name}</strong>
                  <p className="text-xs text-gray-300">{selectedBusiness.address}</p>
                </div>
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>

      {/* legend */}
      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Health Signal Intensity:</span>
          <div
            className="h-4 w-64 rounded-md"
            style={{
              background: `linear-gradient(to right, ${STOPS.map(s => s[1]).join(', ')})`,
            }}
          />
        </div>
        <div className="flex justify-between w-64">
            <span className="text-xs text-gray-400">Low</span>
            <span className="text-xs text-gray-400">High</span>
        </div>
        <div className="text-xs text-gray-400">Data sources: Google Trends, Social Media, News Articles</div>
      </div>
    </motion.div>
  );
}
