import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polygon, Tooltip, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { motion } from 'framer-motion';
import { hexbinData, diseases, generateUniformHexGrid } from '../data/mockData';
import L from 'leaflet';
// Fix for Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
});
export function HealthMap({
  selectedBusiness
}) {
  const [activeDisease, setActiveDisease] = useState('all');
  const [mapLoaded, setMapLoaded] = useState(false);
  const [hexGrid, setHexGrid] = useState([]);
  // Center coordinates for Wayne County, MI
  const wayneCountyCenter = [42.3223, -83.1763];
  useEffect(() => {
    // Set map as loaded after a short delay to ensure proper rendering
    const timer = setTimeout(() => setMapLoaded(true), 500);
    // Generate uniform hex grid
    const grid = generateUniformHexGrid();
    setHexGrid(grid);
    return () => clearTimeout(timer);
  }, []);
  // Combine existing hexbin data with generated grid
  const allHexbins = [...hexbinData, ...hexGrid];
  // Filter hexbin data based on selected disease
  const filteredHexbins = activeDisease === 'all' ? allHexbins : allHexbins.filter(hex => hex.diseases.some(d => d.name.toLowerCase() === activeDisease.toLowerCase()));
  // Get color based on prevalence score
  const getColor = score => {
    if (score > 80) return '#991b1b'; // Very high - dark red
    if (score > 60) return '#dc2626'; // High - red
    if (score > 40) return '#ef4444'; // Medium-high - lighter red
    if (score > 20) return '#f87171'; // Medium - even lighter red
    return '#fca5a5'; // Low - very light red
  };
  return <motion.div initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} transition={{
    duration: 0.5,
    delay: 0.2
  }} className="bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-white mb-2">
          Health Trends Map
        </h2>
        <p className="text-gray-400 mb-4">
          Visualization of health trends across Wayne County, Michigan. Darker
          colors indicate higher prevalence.
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          <button onClick={() => setActiveDisease('all')} className={`px-3 py-1 text-sm rounded-full transition-colors ${activeDisease === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
            All Diseases
          </button>
          {diseases.map(disease => <button key={disease.id} onClick={() => setActiveDisease(disease.name.toLowerCase())} className={`px-3 py-1 text-sm rounded-full transition-colors ${activeDisease === disease.name.toLowerCase() ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
              {disease.name}
            </button>)}
        </div>
      </div>
      <div className="h-[600px] rounded-lg overflow-hidden border border-gray-700">
        {mapLoaded && <MapContainer center={wayneCountyCenter} zoom={10} style={{
        height: '100%',
        width: '100%'
      }} zoomControl={false}>
            <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>' />
            {filteredHexbins.map((hex, idx) => {
          // Calculate total prevalence score for this hexbin
          const totalScore = hex.diseases.reduce((sum, d) => sum + d.prevalence, 0);
          const avgScore = totalScore / hex.diseases.length;
          return <Polygon key={idx} positions={hex.coordinates} pathOptions={{
            fillColor: getColor(avgScore),
            weight: 1,
            opacity: 0.8,
            color: '#374151',
            fillOpacity: 0.7
          }}>
                  <Tooltip direction="center" permanent={false} sticky>
                    <div className="bg-gray-900 p-2 rounded">
                      <strong className="text-white">{hex.location}</strong>
                      <div className="text-xs mt-1 text-gray-200">
                        {hex.diseases.map((d, i) => <div key={i} className="flex justify-between">
                            <span>{d.name}:</span>
                            <span className="font-semibold ml-2">
                              {d.prevalence}%
                            </span>
                          </div>)}
                      </div>
                      <div className="text-xs mt-1 text-gray-300">
                        <span>Articles: {hex.articleCount}</span>
                      </div>
                    </div>
                  </Tooltip>
                </Polygon>;
        })}
            {selectedBusiness && <Marker position={[selectedBusiness.lat, selectedBusiness.lng]}>
                <Popup>
                  <div className="bg-gray-800 p-2 rounded text-white">
                    <strong>{selectedBusiness.name}</strong>
                    <p className="text-xs text-gray-300">
                      {selectedBusiness.address}
                    </p>
                  </div>
                </Popup>
              </Marker>}
          </MapContainer>}
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-sm text-gray-400 mr-2">Prevalence:</span>
          <div className="flex">
            <div className="w-6 h-4 bg-[#fca5a5]"></div>
            <div className="w-6 h-4 bg-[#f87171]"></div>
            <div className="w-6 h-4 bg-[#ef4444]"></div>
            <div className="w-6 h-4 bg-[#dc2626]"></div>
            <div className="w-6 h-4 bg-[#991b1b]"></div>
          </div>
          <div className="flex text-xs text-gray-400 ml-1">
            <span className="w-6 text-center">Low</span>
            <span className="w-24 text-right">High</span>
          </div>
        </div>
        <div className="text-xs text-gray-400">
          Data sources: GDELT, Google Trends, CDC
        </div>
      </div>
    </motion.div>;
}