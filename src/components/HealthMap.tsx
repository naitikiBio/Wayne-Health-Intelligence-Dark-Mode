import React, { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Polygon, Tooltip, Marker, Popup, Pane } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";
import L from "leaflet";
import {
  hexbinData,
  diseases,
  generateUniformHexGrid,
  WAYNE_LAND_SIMPLIFIED, // optional clip (land only)
} from "../data/mockData";

// fix leaflet marker URLs
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
  googleTrendsScore: number; // 0–100
};

export function HealthMap({ selectedBusiness }: { selectedBusiness?: any }) {
  const [activeDisease, setActiveDisease] = useState<string>("all");
  const [hexGrid, setHexGrid] = useState<Hex[]>([]);
  const center: [number, number] = [42.35, -83.20]; // Wayne centroid-ish

  useEffect(() => {
    // smaller hexes and tighter coverage look better on dark maps
    const grid = generateUniformHexGrid(0.0019); // ~200–250m hex radius
    setHexGrid(grid as Hex[]);
  }, []);

  // merge your handcrafted neighborhood hexbins with the generated grid
  const allHexbins: Hex[] = useMemo(() => [...hexbinData, ...hexGrid], [hexGrid]);

  // optional: clip to Wayne County land polygon (prevents water tiles)
  const clippedHexbins = useMemo(() => {
    if (!WAYNE_LAND_SIMPLIFIED) return allHexbins;
    const poly = L.polygon(WAYNE_LAND_SIMPLIFIED as any);
    return allHexbins.filter((h) => {
      // centroid test is fast and good enough here
      const c = centroid(h.coordinates);
      return poly.getBounds().contains(c as any) && leafletPointInPolygon(c, poly);
    });
  }, [allHexbins]);

  // filter by disease if a chip is selected
  const filtered: Hex[] =
    activeDisease === "all"
      ? clippedHexbins
      : clippedHexbins.filter((h) =>
          h.diseases.some((d) => d.name.toLowerCase() === activeDisease.toLowerCase())
        );

  // scale factors for the health “signal”
  const { minArticles, maxArticles } = useMemo(() => {
    let mins = Number.POSITIVE_INFINITY,
      maxs = Number.NEGATIVE_INFINITY;
    for (const h of clippedHexbins) {
      mins = Math.min(mins, h.articleCount);
      maxs = Math.max(maxs, h.articleCount);
    }
    return { minArticles: mins === Infinity ? 0 : mins, maxArticles: maxs === -Infinity ? 1 : maxs };
  }, [clippedHexbins]);

  // color ramp — dark theme, PCFD vibe but tuned for black basemap
  const STOPS: [number, string][] = [
    [0.0, "#0f2d2a"], // deep green
    [0.2, "#235c51"],
    [0.4, "#7fb89f"], // seafoam
    [0.6, "#eee3b6"], // sand
    [0.8, "#e3a985"], // peach
    [1.0, "#b45767"], // rose
  ];

  function hexSignal(h: Hex): number {
    // prevalence (avg across diseases) -> 0..1
    const prev = h.diseases.reduce((s, d) => s + d.prevalence, 0) / (h.diseases.length || 1);
    const prev01 = clamp(prev / 100, 0, 1);
    // trends (already 0..100) -> 0..1
    const trend01 = clamp(h.googleTrendsScore / 100, 0, 1);
    // articles normalized over the sample
    const art01 = clamp((h.articleCount - minArticles) / Math.max(1, maxArticles - minArticles), 0, 1);
    // weights tuned for a pleasant surface
    return 0.55 * prev01 + 0.25 * trend01 + 0.20 * art01;
  }

  function colorFor(v: number): string {
    // piecewise lerp across STOPS
    const x = clamp(v, 0, 1);
    for (let i = 1; i < STOPS.length; i++) {
      const [p0, c0] = STOPS[i - 1];
      const [p1, c1] = STOPS[i];
      if (x <= p1) {
        const t = (x - p0) / (p1 - p0);
        return lerpHex(c0, c1, t);
      }
    }
    return STOPS[STOPS.length - 1][1];
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-gray-800 rounded-lg shadow-lg p-6"
    >
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-white mb-2">Health Trends Map</h2>
        <p className="text-gray-400 mb-4">
          Visualization of health trends across Wayne County, Michigan. Darker colors indicate higher
          prevalence/attention.
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
          {diseases.map((d) => (
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
          zoom={10}
          style={{ height: "100%", width: "100%" }}
          zoomControl={false}
          preferCanvas
        >
          <TileLayer
            // CARTO dark basemap
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />

          {/* make hex layer blend softly */}
          <Pane name="hexes" style={{ mixBlendMode: "multiply" }}>
            {filtered.map((hex, i) => {
              const s = hexSignal(hex);
              const fill = colorFor(s);
              return (
                <Polygon
                  key={i}
                  positions={hex.coordinates}
                  pathOptions={{
                    stroke: false, // << no outlines!
                    fillColor: fill,
                    fillOpacity: 0.72, // soft, lets the base map peek through
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
          </Pane>

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
              background:
                "linear-gradient(90deg,#0f2d2a,#235c51,#7fb89f,#eee3b6,#e3a985,#b45767)",
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

/* ---------- helpers ---------- */

function clamp(x: number, a: number, b: number) {
  return Math.max(a, Math.min(b, x));
}
function hexToRgb(h: string) {
  const s = h.replace("#", "");
  const n = parseInt(s, 16);
  return [n >> 16, (n >> 8) & 255, n & 255];
}
function rgbToHex(r: number, g: number, b: number) {
  const v = (r << 16) + (g << 8) + b;
  return `#${v.toString(16).padStart(6, "0")}`;
}
function lerp(a: number, b: number, t: number) {
  return Math.round(a + (b - a) * t);
}
function lerpHex(c0: string, c1: string, t: number) {
  const [r0, g0, b0] = hexToRgb(c0);
  const [r1, g1, b1] = hexToRgb(c1);
  return rgbToHex(lerp(r0, r1, t), lerp(g0, g1, t), lerp(b0, b1, t));
}

// quick centroid of a hex (leaflet latlng order)
function centroid(coords: [number, number][]): [number, number] {
  let x = 0,
    y = 0;
  for (const [lat, lng] of coords) {
    x += lat;
    y += lng;
  }
  return [x / coords.length, y / coords.length];
}

// point-in-polygon using Leaflet (works even with holes)
function leafletPointInPolygon(pt: [number, number], poly: L.Polygon): boolean {
  const latlng = L.latLng(pt[0], pt[1]);
  return poly.getLatLngs().some((ring: any) => L.polygon(ring).contains(latlng));
}

export default HealthMap;
