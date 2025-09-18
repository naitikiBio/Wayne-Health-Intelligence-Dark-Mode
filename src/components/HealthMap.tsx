import React, { useEffect, useMemo, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Polygon,
  Tooltip,
  Marker,
  Popup,
  Pane,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";
import L from "leaflet";
import {
  hexbinData,
  diseases,
  generateUniformHexGrid,
  businesses as MOCK_BUSINESSES,
} from "../data/mockData";

// -------- Fix Leaflet default marker icons (for Vite/CRA) ----------
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// -------- Color ramp (teal → sand → coral) like the screenshot --------
const RAMP = ["#4aa784", "#bfe2c7", "#f2efc6", "#f2c49a", "#e29578", "#c0546a"];
const hexToRgb = (h: string) => {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h)!;
  return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)];
};
const rampColor = (t: number) => {
  const v = Math.max(0, Math.min(0.999, t));
  const i = Math.floor(v * (RAMP.length - 1));
  const frac = v * (RAMP.length - 1) - i;
  const a = hexToRgb(RAMP[i]);
  const b = hexToRgb(RAMP[i + 1] ?? RAMP[i]);
  const mix = (x: number, y: number) => Math.round(x + (y - x) * frac);
  return `rgb(${mix(a[0], b[0])},${mix(a[1], b[1])},${mix(a[2], b[2])})`;
};

// -------- Helpers --------
type DiseaseSlice = { name: string; prevalence: number };
type Hex = {
  location: string;
  coordinates: [number, number][];
  diseases: DiseaseSlice[];
  articleCount?: number;
  googleTrendsScore?: number;
};

const wayneCountyCenter: [number, number] = [42.33, -83.17];

function hexCenter(coords: [number, number][]) {
  const c = coords.reduce(
    (a, [lat, lng]) => ({ lat: a.lat + lat, lng: a.lng + lng }),
    { lat: 0, lng: 0 }
  );
  return { lat: c.lat / coords.length, lng: c.lng / coords.length };
}

// soft mask to avoid obvious water tiles northeast/east
function keepOnLand(coords: [number, number][]) {
  const c = hexCenter(coords);
  if (c.lng > -83.02 && c.lat > 42.35) return false;
  if (c.lng > -82.97) return false;
  return true;
}

// health “signal” score (0..1)
function signalScore(h: Hex, active: string) {
  const trends = (h.googleTrendsScore ?? 0) / 100; // 0..1
  const news = Math.min(1, (h.articleCount ?? 0) / 60); // 0..1

  let prevalence = 0;
  if (active === "All Diseases") {
    const total = h.diseases.reduce((s, d) => s + d.prevalence, 0);
    prevalence = Math.min(1, total / 120); // ≈ normalize 0..120
  } else {
    const one =
      h.diseases.find(
        (d) => d.name.toLowerCase() === active.toLowerCase()
      )?.prevalence ?? 0;
    prevalence = Math.min(1, one / 50); // 0..1
  }

  // weights tuned for nicer contrast
  return 0.6 * prevalence + 0.2 * news + 0.2 * trends;
}

export function HealthMap({
  selectedBusiness,
}: {
  selectedBusiness?: { lat: number; lng: number; name: string; address: string };
}) {
  const [activeDisease, setActiveDisease] = useState<string>("All Diseases");
  const [mapLoaded, setMapLoaded] = useState(false);

  // build grid once
  const grid = useMemo(() => generateUniformHexGrid(), []);
  // combine curated + generated, land-only
  const allHexbins: Hex[] = useMemo(
    () => [...hexbinData, ...grid].filter((h: Hex) => keepOnLand(h.coordinates)),
    [grid]
  );

  const filteredHexbins = useMemo(() => {
    if (activeDisease === "All Diseases") return allHexbins;
    return allHexbins.filter((h) =>
      h.diseases.some(
        (d) => d.name.toLowerCase() === activeDisease.toLowerCase()
      )
    );
  }, [activeDisease, allHexbins]);

  useEffect(() => {
    const t = setTimeout(() => setMapLoaded(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, delay: 0.1 }}
      className="bg-gray-900 rounded-lg shadow-lg p-6"
    >
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-white mb-2">
          Health Trends Map
        </h2>
        <p className="text-gray-400 mb-4">
          Visualization of health trends across Wayne County, Michigan. Darker
          colors indicate higher prevalence/attention.
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setActiveDisease("All Diseases")}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              activeDisease === "All Diseases"
                ? "bg-cyan-500 text-gray-900"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            All Diseases
          </button>
          {diseases.map((d) => (
            <button
              key={d.id}
              onClick={() => setActiveDisease(d.name)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                activeDisease === d.name
                  ? "bg-cyan-500 text-gray-900"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {d.name}
            </button>
          ))}
        </div>
      </div>

      {/* Map */}
      <div className="h-[600px] rounded-lg overflow-hidden border border-gray-800">
        {mapLoaded && (
          <MapContainer
            center={wayneCountyCenter}
            zoom={10}
            style={{ height: "100%", width: "100%" }}
            zoomControl={false}
            preferCanvas
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            />

            {/* Put hexes on their own pane to sit nicely above tiles */}
            <Pane name="hexes" style={{ zIndex: 350, mixBlendMode: "normal" }}>
              {filteredHexbins.map((hex, idx) => {
                const s = signalScore(hex as Hex, activeDisease);
                const fill = rampColor(s);

                const top3 = [...hex.diseases]
                  .sort((a, b) => b.prevalence - a.prevalence)
                  .slice(0, 3);

                return (
                  <Polygon
                    key={idx}
                    positions={hex.coordinates as any}
                    pathOptions={{
                      color: "rgba(0,0,0,0)",
                      weight: 0,
                      fillColor: fill,
                      fillOpacity: 0.72,
                    }}
                  >
                    <Tooltip direction="top" sticky>
                      <div className="bg-gray-900/90 p-2 rounded text-gray-200">
                        <strong className="text-white">
                          {hex.location || "Wayne County"}
                        </strong>
                        <div className="text-xs mt-1">
                          Signal: {(s * 100).toFixed(0)} · Articles:{" "}
                          {hex.articleCount ?? 0} · Trend:{" "}
                          {hex.googleTrendsScore ?? 0}
                        </div>
                        <div className="text-xs mt-1">
                          {top3.map((d) => (
                            <div key={d.name} className="flex justify-between">
                              <span>{d.name}</span>
                              <span className="font-semibold ml-2">
                                {d.prevalence}%
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Tooltip>
                  </Polygon>
                );
              })}
            </Pane>

            {/* Selected business marker (if any) */}
            {selectedBusiness && (
              <Marker
                position={[selectedBusiness.lat, selectedBusiness.lng]}
                title={selectedBusiness.name}
              >
                <Popup>
                  <div className="bg-gray-800 p-2 rounded text-white">
                    <strong>{selectedBusiness.name}</strong>
                    <p className="text-xs text-gray-300">
                      {selectedBusiness.address}
                    </p>
                  </div>
                </Popup>
              </Marker>
            )}
          </MapContainer>
        )}
      </div>

      {/* Legend */}
      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-sm text-gray-400 mr-2">Health signal:</span>
          <div className="w-40 h-3 rounded"
               style={{
                 background:
                   "linear-gradient(90deg,#4aa784,#bfe2c7,#f2efc6,#f2c49a,#e29578,#c0546a)",
               }}
          />
          <div className="flex text-xs text-gray-400 ml-2 gap-8">
            <span>Low</span>
            <span>High</span>
          </div>
        </div>
        <div className="text-xs text-gray-400">
          Data sources: GDELT, Google Trends, CDC
        </div>
      </div>
    </motion.div>
  );
}

export default HealthMap;
