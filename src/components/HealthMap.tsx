import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Polygon, Tooltip, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";
import L from "leaflet";
import { hexbinData, diseases, generateUniformHexGrid } from "../data/mockData";

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

type DiseaseBin = { name: string; prevalence: number };
type Hex = {
  location: string;
  coordinates: [number, number][];
  diseases: DiseaseBin[];
  articleCount: number;
  googleTrendsScore: number;
};

interface Business {
  lat: number;
  lng: number;
  name: string;
  address: string;
}

interface Disease {
  id: number;
  name: string;
  description: string;
}

export function HealthMap({ selectedBusiness }: { selectedBusiness?: Business }) {
  const [activeDisease, setActiveDisease] = useState<string>("all");
  const [hexGrid, setHexGrid] = useState<Hex[]>([]);
  const center: [number, number] = [42.30, -83.25];

  useEffect(() => {
    // IMPORTANT: Call your generator with no args (matches your mockData implementation)
    const grid = generateUniformHexGrid() as unknown as Hex[];
    setHexGrid(grid);
  }, []);

  const allHexbins: Hex[] = useMemo(() => [...hexbinData, ...hexGrid], [hexGrid]);
  console.debug("hexes -> sample:", hexbinData.length, "generated:", hexGrid.length, "total:", allHexbins.length);

  // Filter by disease pill
  const filtered: Hex[] =
    activeDisease === "all"
      ? allHexbins
      : allHexbins.filter((h) =>
          h.diseases.some((d) => d.name.toLowerCase() === activeDisease.toLowerCase())
        );

  // Smooth dark-theme ramp (works without blend modes)
  const STOPS: [number, string][] = [
    [0.0, "#1b2a2f"], // deep teal
    [0.25, "#2d6a6a"],
    [0.5, "#9dd3bf"],
    [0.7, "#ecdcae"],
    [0.85, "#e39f77"],
    [1.0, "#b64d62"], // rose
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

  // normalize Article counts for signal
  const { minArticles, maxArticles } = useMemo(() => {
    let min = Number.POSITIVE_INFINITY,
      max = Number.NEGATIVE_INFINITY;
    for (const h of allHexbins) {
      min = Math.min(min, h.articleCount);
      max = Math.max(max, h.articleCount);
    }
    return { minArticles: isFinite(min) ? min : 0, maxArticles: isFinite(max) ? max : 1 };
  }, [allHexbins]);

  function hexSignal(h: Hex): number {
    const prev = h.diseases.reduce((s, d) => s + d.prevalence, 0) / (h.diseases.length || 1); // 0..100
    const prev01 = clamp(prev / 100, 0, 1);
    const trend01 = clamp(h.googleTrendsScore / 100, 0, 1);
    const art01 = clamp((h.articleCount - minArticles) / Math.max(1, maxArticles - minArticles), 0, 1);
    return 0.55 * prev01 + 0.25 * trend01 + 0.20 * art01;
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
        <h2 className="text-xl font-semibold text-white mb-2">Health Trends Map</h2>
        <p className="text-gray-400 mb-4">
          Visualization of health trends across Wayne County, Michigan. Darker colors indicate higher prevalence/attention.
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setActiveDisease("all")}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              activeDisease === "all" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            All Diseases
          </button>
          {diseases.map((d: Disease) => (
            <button
              key={d.id}
              onClick={() => setActiveDisease(d.name.toLowerCase())}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                activeDisease === d.name.toLowerCase()
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {d.name}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[600px] rounded-lg overflow-hidden border border-gray-700">
        <MapContainer 
          center={center} 
          zoom={11} 
          zoomControl={true} 
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* HEX SURFACE – no clipping, no blend mode, very light stroke off */}
          {filtered.map((hex, i) => {
            const s = hexSignal(hex);
            return (
              <Polygon
                key={i}
                positions={hex.coordinates}
                pathOptions={{ 
                  stroke: true,
                  color: "#374151",
                  weight: 1,
                  fillColor: colorFor(s), 
                  fillOpacity: 0.7 
                }}
              >
                <Tooltip direction="top" sticky>
                  <div className="bg-gray-900/90 p-2 rounded">
                    <div className="text-white font-semibold">{hex.location}</div>
                    <div className="text-xs text-gray-200 mt-1">
                      {hex.diseases.map((d, j) => (
                        <div key={j} className="flex justify-between">
                          <span>{d.name}</span>
                          <span className="font-semibold ml-2">{d.prevalence}%</span>
                        </div>
                      ))}
                      <div className="mt-1">Articles: {hex.articleCount}</div>
                      <div>Trends: {hex.googleTrendsScore}</div>
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
          <span className="text-sm text-gray-400">Health signal:</span>
          <div
            className="h-3 w-56 rounded"
            style={{
              background: "linear-gradient(90deg,#1b2a2f,#2d6a6a,#9dd3bf,#ecdcae,#e39f77,#b64d62)",
            }}
          />
          <span className="text-xs text-gray-400 ml-1">Low</span>
          <span className="text-xs text-gray-400 ml-8">High</span>
        </div>
        <div className="text-xs text-gray-400">Data sources: GDELT, Google Trends, CDC</div>
      </div>
    </motion.div>
  );
}
